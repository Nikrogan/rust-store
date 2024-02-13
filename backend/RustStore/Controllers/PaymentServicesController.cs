﻿using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Domain.SimpleEntity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PaymentServiceManager;
using Service.Interfaces;
using System.Text.Json.Nodes;

namespace RustStore.Controllers
{
    [Route("api/v1/paymentservices")]
    [ApiController]
    public class PaymentServicesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IPaymentService _paymentService;
        private readonly IUserService _userService;
        public PaymentServicesController(IConfiguration configuration, IPaymentService paymentService, IUserService userService)
        {
            _configuration = configuration;
            _paymentService = paymentService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IBaseServerResponse<IEnumerable<SimplePaymentService>>> Get()
        {
            var paymentServices = _configuration.GetSection("PaymentServices").Get<List<SimplePaymentService>>();
            return new BaseServerResponse<IEnumerable<SimplePaymentService>>(paymentServices, Domain.Enum.StatusCode.OK);
        }

        [HttpPost]
        public async Task<IBaseServerResponse<string>> Create(InvoiceCreateModel invoiceCreateModel)
        {
            var allPayments = await _paymentService.GetAllPayments();

            var paymentModel = new BasePayment()
            {
                Amount = invoiceCreateModel.Amount,
                PaymentStatus = PaymentStatus.Pending
            };

            if (!allPayments.Data.Any())
                paymentModel.PaymentId = 0;
            else paymentModel.PaymentId = (allPayments.Data.Last().PaymentId + 1);

            invoiceCreateModel.OrderId = paymentModel.PaymentId;
            paymentModel.SteamId = invoiceCreateModel.SteamId;

            string? invoiceUrl = null;
            switch (invoiceCreateModel.PaymentServiceKey) 
            {
                case "custom_lava":
                    //IPayment lavaService = new LavaPaymentService();
                    //IPayment adaptedForLavaService = new PaymentServiceAdapter(lavaService);
                    //invoiceUrl = await adaptedForLavaService.CreateInvoice(invoiceCreateModel);
                    paymentModel.PaymentMethod = PaymentMethods.Lava;
                break;
                case "custom_paypal":
                    invoiceUrl = await PayPalApi.GetInvoice(invoiceCreateModel);
                    paymentModel.PaymentMethod = PaymentMethods.PayPal;
                break;
            }
            if(invoiceUrl == null) return new BaseServerResponse<string>(null, Domain.Enum.StatusCode.InternalServerError);

            await _paymentService.CreatePayment(paymentModel);

            return new BaseServerResponse<string>(invoiceUrl,Domain.Enum.StatusCode.OK);
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

                if(invoiceStatus != "success")
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

        [HttpGet("paypal_success")]
        public async Task<IBaseServerResponse<string>> PayPalSuccessWebHook(string token, string PayerID)
        {
            var status = await PayPalApi.CheckStatus(token);
            return new BaseServerResponse<string>(status.ToString(), Domain.Enum.StatusCode.OK);
        }


    }
}