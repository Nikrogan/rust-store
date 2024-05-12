using Domain.Enum;
using DAL.Interfaces;
using Domain.Entity;
using Domain.Response;
using Service.Interfaces;
using MongoDB.Driver;
using DAL.Repositories;

namespace Service.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IBaseRepository<BaseProduct> _productRepository;
        private readonly IShopFiltersService _shopFiltersService;

        public ProductService(IBaseRepository<BaseProduct> productRepository, IShopFiltersService shopFiltersService)
        {
            _productRepository = productRepository;
            _shopFiltersService = shopFiltersService;
        }

        public async Task<IBaseResponse<BaseProduct>> CreateProduct(BaseProduct viewModel)
        {
            try
            {
                var product = new BaseProduct()
                {
                    ItemId = viewModel.ItemId,
                    Title = viewModel.Title,
                    Description = viewModel.Description,
                    ProductType = viewModel.ProductType,
                    Price = viewModel.Price,
                    Amount = viewModel.Amount,
                    Discount = viewModel.Discount,
                    ImageUrl = viewModel.ImageUrl,
                    CategoryType = viewModel.CategoryType,
                    IsActive = viewModel.IsActive,
                    SimpleProducts = viewModel.SimpleProducts,
                    GiveCommand = viewModel.GiveCommand,
                    ServerKey = viewModel.ServerKey,
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

        public async Task<IBaseResponse<bool>> DeleteProductById(string id)
        {
            var baseResponse = new BaseResponse<bool>();
            try
            {
                var allElements = await _productRepository.GetAll();
                var element = allElements.FirstOrDefault(x => x.Id == id);

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
                var product = allProducts.FirstOrDefault(x => x.Id == viewModel.Id);
                if (product == null)
                {
                    return new BaseResponse<BaseProduct>()
                    {
                        Description = "Element not found",
                        StatusCode = StatusCode.ElementNotFound
                    };
                }

                product.ItemId = viewModel.ItemId;
                product.Title = viewModel.Title;
                product.Description = viewModel.Description;
                product.ProductType = viewModel.ProductType;
                product.Price = viewModel.Price;
                product.ImageUrl = viewModel.ImageUrl;
                product.CategoryType = viewModel.CategoryType;
                product.SimpleProducts = viewModel.SimpleProducts;
                product.Discount = viewModel.Discount;
                product.Amount = viewModel.Amount;
                product.GiveCommand = viewModel.GiveCommand;
                product.IsActive = viewModel.IsActive;
                product.ServerKey = viewModel.ServerKey;

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

        public async Task<IBaseResponse<BaseProduct>> GetProductById(string Id)
        {
            var baseResponse = new BaseResponse<BaseProduct>();
            try
            {
                var allResources = await _productRepository.GetAll();
                var resource = allResources.FirstOrDefault(x => x.Id == Id);
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

        public async Task<IBaseResponse<IEnumerable<BaseProduct>>> GetProductsByServerKey(ulong serverkey)
        {
            var baseResponse = new BaseResponse<IEnumerable<BaseProduct>>();
            try
            {
                var allResources = await _productRepository.GetAll();
                var resource = allResources.Where(x => x.ServerKey == serverkey);
                if (!resource.Any())
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
                return new BaseResponse<IEnumerable<BaseProduct>>()
                {
                    Description = $"[GetProductsByServerKey] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<IEnumerable<ProductView>>> GetAllProductsView()
        {
            var baseResponse = new BaseResponse<IEnumerable<ProductView>>();
            try
            {
                var resource = await _productRepository.GetAll();
                if (resource == null)
                {
                    baseResponse.Description = "No one elements";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource.ToList().ConvertAll(x=>new ProductView(x));
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<IEnumerable<ProductView>>()
                {
                    Description = $"[GetAllProductsView] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<IEnumerable<ProductView>>> GetProductsViewByServerKey(ulong serverkey)
        {
            var baseResponse = new BaseResponse<IEnumerable<ProductView>>();
            try
            {
                var allResources = await _productRepository.GetAll();
                var resource = allResources.Where(x => x.ServerKey == serverkey && x.IsActive);
                if (!resource.Any())
                {
                    baseResponse.Description = "Element not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource.ToList().ConvertAll(x => new ProductView(x));
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<IEnumerable<ProductView>>()
                {
                    Description = $"[GetProductsViewByServerKey] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<ProductView>> GetProductViewById(string Id)
        {
            var baseResponse = new BaseResponse<ProductView>();
            try
            {
                var allResources = await _productRepository.GetAll();
                var resource = allResources.FirstOrDefault(x => x.Id == Id);
                if (resource == null)
                {
                    baseResponse.Description = "Element not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = new ProductView(resource);
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<ProductView>()
                {
                    Description = $"[GetProductViewById] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }
    }
}
