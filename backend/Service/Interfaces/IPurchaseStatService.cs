using Domain.Entity;
using Domain.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IPurchaseStatService
    {
        Task<IBaseResponse<Dictionary<string,ulong>>> GetStat(DateTime startTime, DateTime endTime, ulong[] serverKeys);
        Task<IBaseResponse<IEnumerable<PurchaseStat>>> GetStatDays(DateTime startTime, DateTime endTime, ulong[] serverKeys);
        Task<IBaseResponse<Dictionary<string, ulong>>> GetAllTime(ulong[] serverKeys);
        Task<IBaseResponse<PurchaseStat>> AddStat(BaseProduct baseProduct);
    }
}
