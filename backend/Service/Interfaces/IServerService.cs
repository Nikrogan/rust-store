using Domain.Entity;
using Domain.Response;

namespace Service.Interfaces;

public interface IServerService
{
    Task<IBaseResponse<List<BaseServer>>> GetAll();
    Task<IBaseResponse<List<BaseServer>>> Create(BaseServer newModel);
    Task<IBaseResponse<List<BaseServer>>> Update(BaseServer server);
    Task<IBaseResponse<BaseServer>> Get(string Id);
    Task<IBaseResponse<SimpleServer>> GetInfo(ulong Id);
    Task<IBaseResponse<List<SimpleServer>>> GetAllInfo();
    Task<IBaseResponse<List<BaseServer>>> Delete(string Id);
}