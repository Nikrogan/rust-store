using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace RustStore.Controllers;

[Route("api/v1/shopfilters")]
[ApiController]
public class ShopFiltersController : ControllerBase
{
    private readonly IShopFiltersService _ShopFiltersService;

    public ShopFiltersController(IShopFiltersService shopFiltersService)
    {
        _ShopFiltersService = shopFiltersService;
    }

    [HttpGet]
    public async Task<IBaseServerResponse<IEnumerable<BaseShopFilter>>> Get()
    {
        var response = await _ShopFiltersService.GetAllFilter();
        return new BaseServerResponse<IEnumerable<BaseShopFilter>>(response.Data, response.StatusCode);
    }

    [HttpPost]
    public async Task<IBaseServerResponse<IEnumerable<BaseShopFilter>>> Create(BaseShopFilter shopFilter)
    {
        var response = await _ShopFiltersService.Create(shopFilter);
        return new BaseServerResponse<IEnumerable<BaseShopFilter>>(response.Data, response.StatusCode);
    }

    [HttpPut]
    public async Task Update()
    {
    }

    [HttpDelete]
    public async Task<IBaseServerResponse<List<BaseShopFilter>>> Delete(string Id)
    {
        var response = await _ShopFiltersService.Delete(Id);
        return new BaseServerResponse<List<BaseShopFilter>>(response.Data, response.StatusCode);
    }
}