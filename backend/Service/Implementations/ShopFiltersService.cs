using DAL.Interfaces;
using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Service.Interfaces;

namespace Service.Implementations;

public class ShopFiltersService : IShopFiltersService
{
    private readonly IBaseRepository<BaseShopFilter> _shopFiltersRepository;

    public ShopFiltersService(IBaseRepository<BaseShopFilter> shopFiltersRepository)
    {
        _shopFiltersRepository = shopFiltersRepository;
    }

    public async Task<IBaseResponse<List<BaseShopFilter>>> Create(BaseShopFilter newFilter)
    {
        var baseResponse = new BaseResponse<List<BaseShopFilter>>();
        try
        {
            var newShopFilter = new BaseShopFilter
            {
                Title = newFilter.Title
            };

            await _shopFiltersRepository.Add(newShopFilter);
            var newShopFiltersList = await _shopFiltersRepository.GetAll();
            baseResponse.StatusCode = StatusCode.OK;
            baseResponse.Data = newShopFiltersList.ToList();
            return new BaseResponse<List<BaseShopFilter>>
            {
                StatusCode = StatusCode.OK,
                Data = newShopFiltersList.ToList()
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<BaseShopFilter>>
            {
                Description = $"[CreateShopFilters] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<BaseShopFilter>> Update(int filtersId)
    {
        throw new NotImplementedException();
    }

    public async Task<IBaseResponse<List<BaseShopFilter>>> GetAll()
    {
        var baseResponse = new BaseResponse<List<BaseShopFilter>>();
        try
        {
            var shopFilters = await _shopFiltersRepository.GetAll();
            if (!shopFilters.Any())
            {
                baseResponse.Description = "No one element";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            baseResponse.Data = shopFilters.ToList();
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<BaseShopFilter>>
            {
                Description = $"[GetAllShopFilters] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<List<BaseShopFilter>>> Delete(string Id)
    {
        var baseResponse = new BaseResponse<List<BaseShopFilter>>();
        try
        {
            var allElements = await _shopFiltersRepository.GetAll();
            var element = allElements.FirstOrDefault(x => x.Id == Id);

            if (element == null)
            {
                baseResponse.Description = "Filter not found";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            await _shopFiltersRepository.Delete(element);

            baseResponse.Data = allElements.Where(x => x.Id != Id).ToList();
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<BaseShopFilter>>
            {
                Description = $"[FilterDelete] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }
}