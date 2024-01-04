﻿using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

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
            var response = await _productService.CreateProduct(productModel);
            return new BaseServerResponse<BaseProduct>(response.Data, response.StatusCode);
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
        public async Task<IBaseServerResponse<BaseProduct>> Update(BaseProduct productModel) 
        {
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
