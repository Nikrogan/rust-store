using System.Security.Claims;
using Domain.Entity;
using Domain.Response;

namespace Service.Interfaces
{
    public interface IProductService
    {
        Task<IBaseResponse<IEnumerable<BaseProduct>>> GetAllProducts();
        Task<IBaseResponse<BaseProduct>> CreateProduct(BaseProduct newModel);
        Task<IBaseResponse<BaseProduct>> EditElement(BaseProduct userModel);
        Task<IBaseResponse<BaseProduct>> GetProductById(string Id);
        Task<IBaseResponse<bool>> DeleteProductById(string Id);
        Task<IBaseResponse<IEnumerable<BaseProduct>>> GetProductsByServerKey(ulong serverkey);

        Task<IBaseResponse<IEnumerable<ProductView>>> GetAllProductsView();
        Task<IBaseResponse<ProductView>> GetProductViewById(string Id);
        Task<IBaseResponse<IEnumerable<ProductView>>> GetProductsViewByServerKey(ulong serverkey);
    }
}
