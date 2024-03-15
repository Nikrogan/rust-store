using Domain.Entity;
using Domain.Response;

namespace Service.Interfaces;

public interface IPlayerCheckSheetService
{
    Task<IBaseResponse<List<BasePlayerCheck>>> GetAll();
    Task<IBaseResponse<BasePlayerCheck>> Create(BasePlayerCheck newModel);
    Task<IBaseResponse<BasePlayerCheck>> Update(BasePlayerCheck newModel);
    Task<IBaseResponse<BasePlayerCheck>> Get(string playerId);
    Task<IBaseResponse<BasePlayerCheck>> Delete(string playerId);
}