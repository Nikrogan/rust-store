using Domain.Entity;
using Domain.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IPromoService
    {
        Task<IBaseResponse<IEnumerable<BasePromo>>> GetAllPromo();
        Task<IBaseResponse<BasePromo>> CreatePromo(BasePromo newModel);
        Task<IBaseResponse<BasePromo>> EditElement(BasePromo promoModel);
        Task<IBaseResponse<BasePromo>> GetPromoById(string Id);
        Task<IBaseResponse<BasePromo>> GetPromoByString(string promoCode);
        Task<IBaseResponse<bool>> DeletePromoById(string Id);
    }
}
