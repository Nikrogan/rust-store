using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Domain.SimpleEntity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using PaymentServiceManager;
using Service;
using Service.Interfaces;
using System.Runtime.CompilerServices;
using System.Text.Json.Nodes;

namespace RustStore.Controllers.Default
{
    [Route("api/v1/paymentservices")]
    [ApiController]
    public class PaymentServicesController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IUserService _userService;
        public PaymentServicesController(IPaymentService paymentService, IUserService userService)
        {
            _paymentService = paymentService;
            _userService = userService;
        }

        [HttpGet]
        [SessionAuthorize]
        public async Task<IBaseServerResponse<IEnumerable<SimplePaymentService>>> Get()
        {
            var paymentServices = await ConfigManager.LoadSimpleConfig();
            return new BaseServerResponse<IEnumerable<SimplePaymentService>>(paymentServices, Domain.Enum.StatusCode.OK);
        }

        [HttpGet("freekassa_currencies")]
        public async Task<IBaseServerResponse<object>> GetCurrencies()
        {
            var currencies = await FreeKassaApi.GetCurrencies();
            return new BaseServerResponse<object>(currencies, Domain.Enum.StatusCode.OK);
        }

        [HttpPost]
        [SessionAuthorize]
        public async Task<IBaseServerResponse<string>> Create(InvoiceCreateModel invoiceCreateModel)
        {
            var allPayments = await _paymentService.GetAllPayments();

            var paymentModel = new BasePayment()
            {
                Amount = invoiceCreateModel.Amount,
                PaymentStatus = PaymentStatus.Pending
            };

            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("frontUrl");

            if (HttpContext.Items["CurrentUser"] is not BaseUser user)
                return new BaseServerResponse<string>("", Domain.Enum.StatusCode.InternalServerError);

            if (!allPayments.Data.Any())
                paymentModel.PaymentId = 0;
            else paymentModel.PaymentId = allPayments.Data.Last().PaymentId + 1;

            invoiceCreateModel.OrderId = paymentModel.PaymentId;
            paymentModel.SteamId = user.SteamId;

            InvoiceResponse? invoiceResponse = null;
            switch (invoiceCreateModel.PaymentServiceKey)
            {
                case "custom_lava":
                    //IPayment lavaService = new LavaPaymentService();
                    //IPayment adaptedForLavaService = new PaymentServiceAdapter(lavaService);
                    //invoiceUrl = await adaptedForLavaService.CreateInvoice(invoiceCreateModel);
                    paymentModel.PaymentMethod = PaymentMethods.Lava;
                    break;
                case "custom_paypal":
                    invoiceResponse = await PayPalApi.GetInvoice(invoiceCreateModel);
                    paymentModel.PaymentMethod = PaymentMethods.PayPal;
                    break;
                case "custom_freekassa":
                    invoiceResponse = await FreeKassaApi.GetInvoice(invoiceCreateModel);
                    paymentModel.PaymentMethod = PaymentMethods.Freekassa;
                    break;
            }
            //if(invoiceResponse == null) return Redirect(link);
            if (invoiceResponse == null) return new BaseServerResponse<string>("", Domain.Enum.StatusCode.InternalServerError);

            paymentModel.ServiceOrderId = invoiceResponse.ServiceOrderId;

            await _paymentService.CreatePayment(paymentModel);

            //return Redirect(invoiceResponse.InvoiceUrl);
            return new BaseServerResponse<string>(invoiceResponse.InvoiceUrl, Domain.Enum.StatusCode.OK);

        }

        [HttpPost("lava")]
        public async Task<IActionResult> LavaWebHook([FromBody] JsonObject data)
        {
            try
            {
                if (data.IsNullOrEmpty()) return BadRequest();

                var orderId = data["order_id"].ToString();
                var invoiceStatus = data["status"].ToString();
                var steamID = data["custom_fields"].ToString();
                var payment = await _paymentService.GetPaymentById(orderId);

                if (payment == null) return BadRequest();
                if (payment.Data.PaymentStatus != PaymentStatus.Pending) return BadRequest();

                var user = await _userService.GetUserById(payment.Data.SteamId);
                if (user.StatusCode != Domain.Enum.StatusCode.OK || user.Data == null) return BadRequest();

                if (invoiceStatus != "success")
                {
                    payment.Data.PaymentStatus = PaymentStatus.Canceled;
                    await _paymentService.EditElement(payment.Data);
                    return BadRequest();
                }

                user.Data.Balance += payment.Data.Amount;
                await _userService.EditElement(user.Data);
                payment.Data.PaymentStatus = PaymentStatus.Succeeded;
                await _paymentService.EditElement(payment.Data);

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpGet("enot")]
        public IActionResult EnotWebHook()
        {
            return Ok();
        }


        [HttpGet("paypal_cancel")]
        public async Task<IBaseServerResponse<string>> PayPalCancelWebHook(string token)
        {
            var status = await PayPalApi.CheckStatus(token);
            return new BaseServerResponse<string>(status.ToString(), Domain.Enum.StatusCode.OK);
        }

        [HttpGet("tome_redirect/{id}")]
        public async Task<IActionResult> TomeSuccessWebHook(string id)
        {
            var payment = await _paymentService.GetPaymentByServiceId(id);

            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("frontUrl");

            var user = await _userService.GetUserBySteamId(payment.Data.SteamId);
            if (user.StatusCode != Domain.Enum.StatusCode.OK || user.Data == null) return Redirect(link);

            if (payment.StatusCode != Domain.Enum.StatusCode.OK || payment.Data.ServiceOrderId == null)
                return Redirect(link);

            var serviceOrderId = payment.Data.ServiceOrderId;
            var status = await TomeApi.IsSucceeded(serviceOrderId);
            if (!status) return Redirect(link);

            user.Data.Balance += payment.Data.Amount;
            await _userService.EditElement(user.Data);
            payment.Data.PaymentStatus = PaymentStatus.Succeeded;
            await _paymentService.EditElement(payment.Data);

            await _userService.CreateUserBalanceAction(user.Data.SteamId, new BalanceActionModel
            {
                DateTime = DateTime.Now,
                PaymentName = "Tome",
                OperationType = OperationType.AddBalance,
                Value = payment.Data.Amount
            });

            return Redirect(link);
        }

        [HttpGet("tome_alert")]
        public async Task<IActionResult> TomeAlertWebHook([FromBody] JObject requestBody)
        {
            try
            {
                string id = requestBody["object"]["id"].ToString();
                string status = requestBody["object"]["status"].ToString();

                var payment = await _paymentService.GetPaymentByServiceId(id);

                DotNetEnv.Env.Load();
                var link = Environment.GetEnvironmentVariable("frontUrl");

                if (payment.Data == null) return Redirect(link);
                if (payment.Data.PaymentStatus != PaymentStatus.Pending) return Redirect(link);

                var user = await _userService.GetUserBySteamId(payment.Data.SteamId);
                if (user.StatusCode != Domain.Enum.StatusCode.OK || user.Data == null) return Redirect(link);

                if (status != "succeeded")
                {
                    payment.Data.PaymentStatus = PaymentStatus.Canceled;
                    await _paymentService.EditElement(payment.Data);
                    return Ok();
                }

                user.Data.Balance += payment.Data.Amount;
                await _userService.EditElement(user.Data);
                payment.Data.PaymentStatus = PaymentStatus.Succeeded;
                await _paymentService.EditElement(payment.Data);

                await _userService.CreateUserBalanceAction(user.Data.SteamId, new BalanceActionModel
                {
                    DateTime = DateTime.Now,
                    PaymentName = "Tome",
                    OperationType = OperationType.AddBalance,
                    Value = payment.Data.Amount
                });
            }
            catch
            {
                return Ok();
            }

            return Ok();
        }

        [HttpGet("paypal_success")]
        public async Task<IActionResult> PayPalSuccessWebHook(string token, string PayerID)
        {
            var payment = await _paymentService.GetPaymentByServiceId(token);

            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("frontUrl");

            if (payment.Data == null) return Redirect(link);
            if (payment.Data.PaymentStatus != PaymentStatus.Pending) return Redirect(link);

            var user = await _userService.GetUserBySteamId(payment.Data.SteamId);
            if (user.StatusCode != Domain.Enum.StatusCode.OK || user.Data == null) return Redirect(link);

            var status = await PayPalApi.CheckStatus(token);

            if (status != PaymentStatus.Succeeded)
            {
                payment.Data.PaymentStatus = PaymentStatus.Canceled;
                await _paymentService.EditElement(payment.Data);
                return Redirect(link);
            }

            user.Data.Balance += payment.Data.Amount;
            await _userService.EditElement(user.Data);
            payment.Data.PaymentStatus = PaymentStatus.Succeeded;
            await _paymentService.EditElement(payment.Data);

            await _userService.CreateUserBalanceAction(user.Data.SteamId, new BalanceActionModel
            {
                DateTime = DateTime.Now,
                PaymentName = "PayPal",
                OperationType = OperationType.AddBalance,
                Value = payment.Data.Amount
            });

            return Redirect(link);
        }


    }
}