using System.Security.Claims;
using Domain.Enum;
using DAL.Interfaces;
using Domain.Entity;
using Domain.Response;
using Service.Interfaces;
using MongoDB.Driver;
using RustStats.Service.Interfaces;
using Newtonsoft.Json.Linq;

namespace Service.Implementations
{
    public class PaymentService : IPaymentService
    {
        private readonly IBaseRepository<BasePayment> _paymentRepository;

        public PaymentService(IBaseRepository<BasePayment> paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        public async Task<IBaseResponse<BasePayment>> CreatePayment(BasePayment viewModel)
        {
            try
            {
                var payment = new BasePayment()
                {
                    Amount = viewModel.Amount,
                    DateTime = DateTime.Now,
                    PaymentMethod = viewModel.PaymentMethod,
                    PaymentStatus = viewModel.PaymentStatus,
                    PaymentId = viewModel.PaymentId
                };

                await _paymentRepository.Add(payment);

                return new BaseResponse<BasePayment>()
                {
                    StatusCode = StatusCode.OK,
                    Data = payment
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BasePayment>()
                {
                    Description = $"[CreatePayment] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<bool>> DeletePaymentById(string id)
        {
            var baseResponse = new BaseResponse<bool>();
            try
            {
                var allElements = await _paymentRepository.GetAll();
                var element = allElements.FirstOrDefault(x => x.Id == id);

                if (element == null)
                {
                    baseResponse.Description = "Element not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                await _paymentRepository.Delete(element);

                baseResponse.Data = true;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    Description = $"[DeletePayment] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BasePayment>> EditElement(BasePayment viewModel)
        {
            try
            {
                var allProducts = await _paymentRepository.GetAll();
                var product = allProducts.FirstOrDefault(x => x.Id == viewModel.Id);
                if (product == null)
                {
                    return new BaseResponse<BasePayment>()
                    {
                        Description = "Element not found",
                        StatusCode = StatusCode.ElementNotFound
                    };
                }

                // Изменение данных энтити payment

                await _paymentRepository.Update(product);

                return new BaseResponse<BasePayment>()
                {
                    Data = product,
                    StatusCode = StatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BasePayment>()
                {
                    Description = $"[EditAccount] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<IEnumerable<BasePayment>>> GetAllPayments()
        {
            var baseResponse = new BaseResponse<IEnumerable<BasePayment>>();
            try
            {
                var resource = await _paymentRepository.GetAll();
                if (resource == null)
                {
                    baseResponse.Description = "No one elements";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<IEnumerable<BasePayment>>()
                {
                    Description = $"[GetAllPayments] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BasePayment>> GetPaymentById(string id)
        {
            var baseResponse = new BaseResponse<BasePayment>();
            try
            {
                var allResources = await _paymentRepository.GetAll();
                var resource = allResources.FirstOrDefault(x => x.Id == id);
                if (resource == null)
                {
                    baseResponse.Description = "Element not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<BasePayment>()
                {
                    Description = $"[GetPaymentById] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }
    }
}
