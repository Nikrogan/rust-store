using Domain.Response;

namespace Service.Interfaces
{
    public interface IAdditionStatService
    {
        Task<IBaseResponse<Dictionary<DateTime, decimal>>> GetStat(DateTime startTime, DateTime endTime);
        Task<IBaseResponse<decimal>> GetAllTime();
    }
}
