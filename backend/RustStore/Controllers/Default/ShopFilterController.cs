using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers.Default;

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
        var response = await _ShopFiltersService.GetAll();
        return new BaseServerResponse<IEnumerable<BaseShopFilter>>(response.Data, response.StatusCode);
    }
}