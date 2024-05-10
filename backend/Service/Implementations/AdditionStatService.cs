using DAL.Interfaces;
using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Service.Interfaces;

namespace Service.Implementations
{
    public class AdditionStatService : IAdditionStatService
    {
        private readonly IBaseRepository<BasePayment> _PaymentRepository;

        public AdditionStatService(IBaseRepository<BasePayment> paymentRepository)
        {
            _PaymentRepository = paymentRepository;
        }

        public async Task<IBaseResponse<decimal>> GetAllTime()
        {
            var baseResponse = new BaseResponse<decimal>();
            try
            {
                var data = await _PaymentRepository.GetAll();
                if (!data.Any())
                {
                    baseResponse.Description = "No one element";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                var filteredPayments = data.Sum(x => x.Amount);

                baseResponse.Data = filteredPayments;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<decimal>
                {
                    Description = $"[GetAllTime] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<Dictionary<DateTime, decimal>>> GetStat(DateTime startTime, DateTime endTime)
        {
            var baseResponse = new BaseResponse<Dictionary<DateTime, decimal>>();
            try
            {
                var data = await _PaymentRepository.GetAll();
                if (!data.Any())
                {
                    baseResponse.Description = "No one element";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                var filteredPayments = data
                    .Where(p => p.DateTime.HasValue 
                    && p.DateTime.Value.Date >= startTime.Date && p.DateTime.Value.Date <= endTime.Date
                    && p.PaymentStatus == PaymentStatus.Succeeded)
                    .GroupBy(p => p.DateTime.Value.Date)
                    .ToDictionary(g => g.Key, g => g.Sum(p => p.Amount));

                baseResponse.Data = filteredPayments;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<Dictionary<DateTime, decimal>>
                {
                    Description = $"[GetStat] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }
    }
}
