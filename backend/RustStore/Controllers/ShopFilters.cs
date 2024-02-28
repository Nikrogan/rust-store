using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace RustStore.Controllers
{
    [Route("api/v1/shopfilters")]
    [ApiController]
    public class ShopFiltersController: ControllerBase
    {

        private readonly IShopFiltersService _ShopFiltersService;

        public ShopFiltersController(IShopFiltersService shopFiltersService)
        {
            _ShopFiltersService = shopFiltersService;
        }
        
        [HttpGet]
        public async Task<IBaseServerResponse<IEnumerable<BaseShopFilters>>> Get()
        {
            var response = await _ShopFiltersService.GetAllFilter();
            return new BaseServerResponse<IEnumerable<BaseShopFilters>>(response.Data, response.StatusCode);

        }
        
        [HttpPost]
        public async Task<IBaseServerResponse<IEnumerable<BaseShopFilters>>> Create()
        {
            var response = await _ShopFiltersService.GetAllFilter();
            return new BaseServerResponse<IEnumerable<BaseShopFilters>>(response.Data, response.StatusCode);
        }
        
        [HttpPut]
        public async Task Update()
        {
            
        }
        
        [HttpDelete]
        public async Task Delete()
        {
            
        }
    }
}