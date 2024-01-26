using System.Security.Claims;
using Domain.Entity;
using Domain.Response;

namespace Service.Interfaces
{
    public interface IUserService
    {
        Task<IBaseResponse<IEnumerable<BaseUser>>> GetAllUsers();
        Task<IBaseResponse<BaseUser>> CreateUser(BaseUser newModel);
        Task<IBaseResponse<BaseUser>> EditElement(BaseUser userModel);
        Task<IBaseResponse<BaseUser>> GetUserBySteamId(string steamId);
        Task<IBaseResponse<BaseUser>> GetUserBySessionId(string sessionId);
        Task<IBaseResponse<BaseUser>> GetUserById(string Id);
        Task<IBaseResponse<BaseUser>> GetUserByName(string name);
        Task<IBaseResponse<bool>> DeleteUserBySteamId(string steamId);
        Task<IBaseResponse<BaseUser>> LoginUser(string steamID);


    }
}
