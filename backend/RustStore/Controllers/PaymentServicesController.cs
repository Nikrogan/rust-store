using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Domain.SimpleEntity;
using Microsoft.AspNetCore.Mvc;
using PaymentAdapter;
using Service.Interfaces;

namespace RustStore.Controllers
{
    [Route("api/v1/paymentservices")]
    [ApiController]
    public class PaymentServicesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IPaymentService _paymentService;
        public PaymentServicesController(IConfiguration configuration, IPaymentService paymentService)
        {
            _configuration = configuration;
            _paymentService = paymentService;
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
            var paymentServices = _configuration.GetSection("PaymentServices").Get<List<PaymentServiceModel>>();
            var serviceModel = paymentServices.FirstOrDefault(x => x.PaymentServiceKey == invoiceCreateModel.PaymentServiceKey);
            if (serviceModel == null) return new BaseServerResponse<string>(null, Domain.Enum.StatusCode.InternalServerError);

            invoiceCreateModel.PaymentServiceModel = serviceModel;

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

            string? invoiceUrl = null;
            switch (invoiceCreateModel.PaymentServiceKey) 
            {
                case "custom_lava":
                    IPayment lavaService = new LavaPaymentService();
                    IPayment adaptedPaypalService = new PaymentServiceAdapter(lavaService);
                    invoiceUrl = adaptedPaypalService.ProcessPayment(invoiceCreateModel);
                    paymentModel.PaymentMethod = PaymentMethods.Lava;
                break;
            }
            if(invoiceUrl == null) return new BaseServerResponse<string>(null, Domain.Enum.StatusCode.InternalServerError);

            await _paymentService.CreatePayment(paymentModel);

            return new BaseServerResponse<string>(invoiceUrl,Domain.Enum.StatusCode.OK);
        }
    }
}