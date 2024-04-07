using Domain.Entity;
using Domain.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IImageService
    {
       // Task<IBaseResponse<IEnumerable<BaseProduct>>> GetAllProducts();
        Task<IBaseResponse<string>> AddImage(byte[] imageBytes);
        Task<IBaseResponse<string>> EditElement(byte[] imageBytes, string id);
        Task<IBaseResponse<byte[]>> GetImage(string Id);
        Task<IBaseResponse<bool>> DeleteImage(string Id);
    }
}
