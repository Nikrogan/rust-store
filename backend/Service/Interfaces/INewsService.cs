using Domain.Entity;
using Domain.Response;
using Domain.SimpleEntity;

namespace Service.Interfaces
{
    public interface INewsService
    {
        Task<IBaseResponse<IEnumerable<BaseNews>>> GetAllNews();
        Task<IBaseResponse<BaseNews>> CreateNews(SimpleNews newModel);
        Task<IBaseResponse<BaseNews>> EditElement(BaseNews newsModel);
        Task<IBaseResponse<BaseNews>> GetNewsById(int Id);
        Task<IBaseResponse<bool>> DeleteNewsById(int Id);
    }
}
