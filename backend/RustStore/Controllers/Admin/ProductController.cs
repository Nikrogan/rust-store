using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers.Admin
{
    [Route("api/v1/admin/products")]
    [ApiController]
    [SessionAuthorize(2)]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet]
        public async Task<IBaseServerResponse<IEnumerable<BaseProduct>>> Get()
        {
            var response = await _productService.GetAllProducts();
            return new BaseServerResponse<IEnumerable<BaseProduct>>(response.Data, response.StatusCode);
        }

        [HttpPost]
        public async Task<IBaseServerResponse<BaseProduct>> Create(BaseProduct productModel)
        {
            var response = await _productService.CreateProduct(productModel);
            return new BaseServerResponse<BaseProduct>(response.Data, response.StatusCode);
        }

        [HttpGet("{id}")]
        public async Task<IBaseServerResponse<BaseProduct>> Get(string id)
        {
            var response = await _productService.GetProductById(id);
            return new BaseServerResponse<BaseProduct>(response.Data, response.StatusCode);
        }

        [HttpGet("{serverkey}")]
        public async Task<IBaseServerResponse<IEnumerable<BaseProduct>>> Get(ulong serverkey)
        {
            var response = await _productService.GetProductsByServerKey(serverkey);
            return new BaseServerResponse<IEnumerable<BaseProduct>>(response.Data, response.StatusCode);
        }

        [HttpPut]
        public async Task<IBaseServerResponse<BaseProduct>> Update(BaseProduct productModel)
        {
            var response = await _productService.EditElement(productModel);
            return new BaseServerResponse<BaseProduct>(response.Data, response.StatusCode);
        }

        [HttpDelete("{id}")]
        public async Task<IBaseServerResponse<BaseProduct>> Delete(string id)
        {
            var response = await _productService.DeleteProductById(id);
            return new BaseServerResponse<BaseProduct>(null, response.StatusCode);
        }
    }
}
