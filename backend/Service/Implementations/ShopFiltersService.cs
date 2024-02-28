using Domain.Entity;
using Domain.Response;
using Service.Interfaces;

namespace Service.Implementations
{
    public class ShopFiltersService: IShopFiltersService
    {
        public Task<IBaseResponse<IEnumerable<BaseShopFilters>>> GetAllFilter()
        {
            throw new NotImplementedException();
        }

        public Task<IBaseResponse<BaseShopFilters>> Create(BaseShopFilters newFilters)
        {
            throw new NotImplementedException();
        }

        public Task<IBaseResponse<BaseShopFilters>> Update(int filtersId)
        {
            throw new NotImplementedException();
        }

        public Task<IBaseResponse<BaseShopFilters>> Delete(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
