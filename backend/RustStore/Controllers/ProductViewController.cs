using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace RustStore.Controllers
{
    [Route("api/v1/products")]
    [ApiController]
    public class ProductViewController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductViewController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IBaseServerResponse<IEnumerable<ProductView>>> Get()
        {
            var response = await _productService.GetAllProductsView();
            return new BaseServerResponse<IEnumerable<ProductView>>(response.Data, response.StatusCode);
        }

        [HttpGet("id{id}")]
        public async Task<IBaseServerResponse<ProductView>> Get(string id)
        {
            var response = await _productService.GetProductViewById(id);
            return new BaseServerResponse<ProductView>(response.Data, response.StatusCode);
        }

        [HttpGet("{serverkey}")]
        public async Task<IBaseServerResponse<IEnumerable<ProductView>>> Get(ulong serverkey)
        {
            var response = await _productService.GetProductsViewByServerKey(serverkey);
            return new BaseServerResponse<IEnumerable<ProductView>>(response.Data, response.StatusCode);
        }
    }
}
