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

        [HttpGet("{paymentServiceKey}_{amount}")]
        public async Task<IBaseServerResponse<string>> Get(PaymentCreateModel paymentCreateModel)
        {
            var paymentServices = _configuration.GetSection("PaymentServices").Get<List<PaymentServiceModel>>();
            var serviceModel = paymentServices.FirstOrDefault(x => x.PaymentServiceKey == paymentCreateModel.PaymentServiceKey);
            if (serviceModel == null) return new BaseServerResponse<string>(null, Domain.Enum.StatusCode.InternalServerError);

            paymentCreateModel.PaymentServiceModel = serviceModel;

            var allPayments = await _paymentService.GetAllPayments();

            var paymentModel = new BasePayment()
            {
                Amount = paymentCreateModel.Amount,
                PaymentStatus = PaymentStatus.Pending
            };

            paymentModel.SetLastId(allPayments.Data);

            paymentCreateModel.OrderId = paymentModel.PaymentId;

            string? invoiceUrl = null;
            switch (paymentCreateModel.PaymentServiceKey) 
            {
                case "custom_lava":
                    IPayment lavaService = new LavaPaymentService();
                    IPayment adaptedPaypalService = new PaymentServiceAdapter(lavaService);
                    invoiceUrl = adaptedPaypalService.ProcessPayment(paymentCreateModel);
                    paymentModel.PaymentMethod = PaymentMethods.Lava;
                break;
            }
            if(invoiceUrl == null) return new BaseServerResponse<string>(null, Domain.Enum.StatusCode.InternalServerError);

            await _paymentService.CreatePayment(paymentModel);

            return new BaseServerResponse<string>(invoiceUrl,Domain.Enum.StatusCode.OK);
        }
    }
}