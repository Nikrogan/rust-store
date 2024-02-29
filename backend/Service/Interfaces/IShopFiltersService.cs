using Domain.Entity;
using Domain.Response;

namespace Service.Interfaces;

public interface IShopFiltersService
{
    Task<IBaseResponse<List<BaseShopFilter>>> GetAllFilter();
    Task<IBaseResponse<List<BaseShopFilter>>> Create(BaseShopFilter newFilter);
    Task<IBaseResponse<BaseShopFilter>> Update(int filtersId);
    Task<IBaseResponse<BaseShopFilter>> Delete(string Id);
}