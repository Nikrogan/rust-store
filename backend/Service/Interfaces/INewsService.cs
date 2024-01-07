using System.Security.Claims;
using Domain.Entity;
using Domain.Response;

namespace Service.Interfaces
{
    public interface INewsService
    {
        Task<IBaseResponse<IEnumerable<BaseNews>>> GetAllNews();
        Task<IBaseResponse<BaseNews>> CreateNews(BaseNews newModel);
        Task<IBaseResponse<BaseNews>> EditElement(BaseNews newsModel);
        Task<IBaseResponse<BaseNews>> GetNewsById(int Id);
        Task<IBaseResponse<bool>> DeleteNewsById(int Id);
    }
}
