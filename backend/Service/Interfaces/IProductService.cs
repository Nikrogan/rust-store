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
    }
}
