using Domain.Response;

namespace Service.Interfaces
{
    public interface IImageService
    {
       // Task<IBaseResponse<IEnumerable<BaseProduct>>> GetAllProducts();
        Task<IBaseResponse<string>> AddImage(byte[] imageBytes);
        Task<IBaseResponse<byte[]>> EditElement(byte[] imageBytes, string id);
        Task<IBaseResponse<byte[]>> GetImage(string Id);
        Task<IBaseResponse<bool>> DeleteImage(string Id);
    }
}
