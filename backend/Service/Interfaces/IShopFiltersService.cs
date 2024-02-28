using Domain.Entity;
using Domain.Response;

namespace Service.Interfaces;

public interface IShopFiltersService
{
    Task<IBaseResponse<IEnumerable<BaseShopFilters>>> GetAllFilter();
    Task<IBaseResponse<BaseShopFilters>> Create(BaseShopFilters newFilters);
    Task<IBaseResponse<BaseShopFilters>> Update(int filtersId);
    Task<IBaseResponse<BaseShopFilters>> Delete(int Id);
}