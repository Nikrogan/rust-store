using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Http;

namespace Service.Interfaces
{
    public interface IDefaultItemService
    {
        Task<IBaseResponse<IEnumerable<DefaultItem>>> GetDefaultItems();
    }
}
