using System.Security.Claims;
using Domain.Enum;
using DAL.Interfaces;
using Domain.Entity;
using Domain.Response;
using Service.Interfaces;
using MongoDB.Driver;
using RustStats.Service.Interfaces;
using Newtonsoft.Json.Linq;
using Domain.SimpleEntity;
using System.Diagnostics;

namespace Service.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IBaseRepository<BaseProduct> _productRepository;

        public ProductService(IBaseRepository<BaseProduct> productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IBaseResponse<BaseProduct>> CreateProduct(BaseProduct viewModel)
        {
            try
            {
                var product = new BaseProduct()
                {
                    ProductId = viewModel.ProductId,
                    Title = viewModel.Title,
                    Description = viewModel.Description,
                    ProductType = viewModel.ProductType,
                    Price = viewModel.Price,
                    ImageUrl = viewModel.ImageUrl,
                    CategoryType = viewModel.CategoryType,
                    SimpleProducts = viewModel.SimpleProducts
                };

                await _productRepository.Add(product);

                return new BaseResponse<BaseProduct>()
                {
                    StatusCode = StatusCode.OK,
                    Data = product
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseProduct>()
                {
                    Description = $"[CreateProduct] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<bool>> DeleteProductById(int id)
        {
            var baseResponse = new BaseResponse<bool>();
            try
            {
                var allElements = await _productRepository.GetAll();
                var element = allElements.FirstOrDefault(x => x.ProductId == id);

                if (element == null)
                {
                    baseResponse.Description = "Element not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                await _productRepository.Delete(element);

                baseResponse.Data = true;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    Description = $"[DeleteProduct] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseProduct>> EditElement(BaseProduct viewModel)
        {
            try
            {
                var allProducts = await _productRepository.GetAll();
                var product = allProducts.FirstOrDefault(x => x.ProductId == viewModel.ProductId);
                if (product == null)
                {
                    return new BaseResponse<BaseProduct>()
                    {
                        Description = "Element not found",
                        StatusCode = StatusCode.ElementNotFound
                    };
                }

                product.ProductId = viewModel.ProductId;
                product.Title = viewModel.Title;
                product.Description = viewModel.Description;
                product.ProductType = viewModel.ProductType;
                product.Price = viewModel.Price;
                product.ImageUrl = viewModel.ImageUrl;
                product.CategoryType = viewModel.CategoryType;
                product.SimpleProducts = viewModel.SimpleProducts;

                // Изменение данных энтити продукта

                await _productRepository.Update(product);

                return new BaseResponse<BaseProduct>()
                {
                    Data = product,
                    StatusCode = StatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseProduct>()
                {
                    Description = $"[EditProduct] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<IEnumerable<BaseProduct>>> GetAllProducts()
        {
            var baseResponse = new BaseResponse<IEnumerable<BaseProduct>>();
            try
            {
                var resource = await _productRepository.GetAll();
                if (resource == null)
                {
                    baseResponse.Description = "No one elements";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<IEnumerable<BaseProduct>>()
                {
                    Description = $"[GetAllProducts] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseProduct>> GetProductById(int id)
        {
            var baseResponse = new BaseResponse<BaseProduct>();
            try
            {
                var allResources = await _productRepository.GetAll();
                var resource = allResources.FirstOrDefault(x => x.ProductId == id);
                if (resource == null)
                {
                    baseResponse.Description = "Element not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseProduct>()
                {
                    Description = $"[GetProductById] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }
    }
}
