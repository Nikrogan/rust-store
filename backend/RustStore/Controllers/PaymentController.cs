using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers
{
    [Route("api/v1/payment")]
    [ApiController]
    [SessionAuthorize(2)]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }


        [HttpGet]
        public async Task<IBaseServerResponse<IEnumerable<BasePayment>>> Get()
        {
            var response = await _paymentService.GetAllPayments();
            return new BaseServerResponse<IEnumerable<BasePayment>>(response.Data, response.StatusCode);
        }

        [HttpPost]
        public async Task<IBaseServerResponse<BasePayment>> Create(BasePayment paymentModel)
        {
            var response = await _paymentService.CreatePayment(paymentModel);
            return new BaseServerResponse<BasePayment>(response.Data, response.StatusCode);
        }

        [HttpGet("{id}")]
        public async Task<IBaseServerResponse<BasePayment>> Get(string id)
        {
            var response = await _paymentService.GetPaymentById(id);
            return new BaseServerResponse<BasePayment>(response.Data, response.StatusCode);
        }

        [HttpPut]
        public async Task<IBaseServerResponse<BasePayment>> Update(BasePayment productModel)
        {
            var response = await _paymentService.EditElement(productModel);
            return new BaseServerResponse<BasePayment>(response.Data, response.StatusCode);
        }

        [HttpDelete("{id}")]
        public async Task<IBaseServerResponse<BasePayment>> Delete(string id)
        {
            var response = await _paymentService.DeletePaymentById(id);
            return new BaseServerResponse<BasePayment>(null, response.StatusCode);
        }
    }
}
