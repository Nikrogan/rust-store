using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System;
using System.Text.Json;

namespace RustStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("create")]
        public async Task<IBaseServerResponse<BaseProduct>> Create(BaseProduct productModel)
        {
            //BaseProduct? productModel = JsonSerializer.Deserialize<BaseProduct>(jsonModel);
            //if(productModel == null)
            //    return new BaseServerResponse<BaseProduct>(null, Domain.Enum.StatusCode.BadRequest);

            var response = await _productService.CreateProduct(productModel);

            return new BaseServerResponse<BaseProduct>(response.Data, response.StatusCode);
        }

        [HttpGet("testt")]
        public async Task<IBaseServerResponse<BaseProduct>> Testt()
        {
            var a = new BaseProduct { ProductId = 12312, Description = "fdsdfgsdfahg", ImageUrl = " fsdgsadfgsag", Price = 123, Title = "fsdfgs" };
            
            return new BaseServerResponse<BaseProduct>(null,Domain.Enum.StatusCode.OK);
        }

        [HttpGet("getall")]
        public async Task<IBaseServerResponse<IEnumerable<BaseProduct>>> GetAll()
        {
            var response = await _productService.GetAllProducts();

            return new BaseServerResponse<IEnumerable<BaseProduct>>(response.Data, response.StatusCode);
        }

        [HttpGet("get")]
        public async Task<IBaseServerResponse<BaseProduct>> Get(int id)
        {
            var response = await _productService.GetProductById(id);

            return new BaseServerResponse<BaseProduct>(response.Data, response.StatusCode);

        }

        [HttpPost("update")]
        public async Task<IBaseServerResponse<BaseProduct>> Update(string jsonModel) 
        {
            BaseProduct? productModel = JsonSerializer.Deserialize<BaseProduct>(jsonModel);
            if (productModel == null)
                return new BaseServerResponse<BaseProduct>(null, Domain.Enum.StatusCode.BadRequest);

            var response = await _productService.EditElement(productModel);

            return new BaseServerResponse<BaseProduct>(response.Data, response.StatusCode);
        }

        [HttpPost("delete")]
        public async Task<IBaseServerResponse<BaseProduct>> Delete(int id)
        {
            var response = await _productService.DeleteProductById(id);

            return new BaseServerResponse<BaseProduct>(null, response.StatusCode);
        }
    }
}
