using DAL.Interfaces;
using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Service.Interfaces;

namespace Service.Implementations
{
    public class PurchaseStatService : IPurchaseStatService
    {
        private readonly IBaseRepository<PurchaseStat> _PurchaseStatRepository;

        public PurchaseStatService(IBaseRepository<PurchaseStat> purchaseStatRepository)
        {
            _PurchaseStatRepository = purchaseStatRepository;
        }

        private static bool AreSameDay(DateTime date1, DateTime date2)
        {
            return date1.Year == date2.Year && date1.Month == date2.Month && date1.Day == date2.Day;
        }

        public async Task<IBaseResponse<PurchaseStat>> AddStat(BaseProduct baseProduct)
        {
            var baseResponse = new BaseResponse<PurchaseStat>();
            try
            {
                var data = await _PurchaseStatRepository.GetAll();
                if (!data.Any() || data.FirstOrDefault(x=> AreSameDay(x.StatDate.Value, DateTime.Today))== null)
                {
                    var newStat = new PurchaseStat()
                    {
                        ServerID = baseProduct.ServerKey,
                        ProductName = baseProduct.Title,
                        PurchasesCount = 1,
                        StatDate = DateTime.Now
                    };
                    await _PurchaseStatRepository.Add(newStat);
                    baseResponse.Data = newStat;
                    baseResponse.StatusCode = StatusCode.OK;
                    return baseResponse;
                }

                var similarStat = data.FirstOrDefault(x => AreSameDay(x.StatDate.Value, DateTime.Today));
                similarStat.PurchasesCount++;
                await _PurchaseStatRepository.Update(similarStat);
                baseResponse.Data = similarStat;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<PurchaseStat>
                {
                    Description = $"[AddStat] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<Dictionary<string, ulong>>> GetAllTime(ulong[] serverKeys)
        {
            var baseResponse = new BaseResponse<Dictionary<string, ulong>>();
            try
            {
                var data = await _PurchaseStatRepository.GetAll();
                if (!data.Any())
                {
                    baseResponse.Description = "No one element";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = data.ToDictionary(g => g.ProductName, g => g.PurchasesCount);
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<Dictionary<string, ulong>>
                {
                    Description = $"[GetAllTime] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<Dictionary<string, ulong>>> GetStat(DateTime startTime, DateTime endTime, ulong[] serverKeys)
        {
            var baseResponse = new BaseResponse<Dictionary<string, ulong>>();
            try
            {
                var data = await _PurchaseStatRepository.GetAll();
                if (!data.Any())
                {
                    baseResponse.Description = "No one element";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                var filteredList = data
                    .Where(p => serverKeys.Contains(p.ServerID) && p.StatDate >= startTime && p.StatDate <= endTime)
                    .GroupBy(p => new { p.ProductName, p.ServerID })
                    .ToDictionary(g => g.Key.ProductName, g => g.Aggregate(0UL, (sum, next) => sum + next.PurchasesCount));

                baseResponse.Data = filteredList;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<Dictionary<string, ulong>>
                {
                    Description = $"[GetStat] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<IEnumerable<PurchaseStat>>> GetStatDays(DateTime startTime, DateTime endTime, ulong[] serverKeys)
        {
            var baseResponse = new BaseResponse<IEnumerable<PurchaseStat>>();
            try
            {
                var data = await _PurchaseStatRepository.GetAll();
                if (!data.Any())
                {
                    baseResponse.Description = "No one element";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                var filteredList = data
                    .Where(p => serverKeys.Contains(p.ServerID) && p.StatDate >= startTime && p.StatDate <= endTime);

                baseResponse.Data = filteredList;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<IEnumerable<PurchaseStat>>
                {
                    Description = $"[GetStatDays] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }
    }
}
