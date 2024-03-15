using DAL.Interfaces;
using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Service.Interfaces;

namespace Service.Implementations;

public class PlayerCheckSheetService : IPlayerCheckSheetService
{
    private readonly IBaseRepository<BasePlayerCheck> _playerCheckSheetRepository;

    public PlayerCheckSheetService(IBaseRepository<BasePlayerCheck> playerCheckSheetRepository)
    {
        _playerCheckSheetRepository = playerCheckSheetRepository;
    }

    public async Task<IBaseResponse<BasePlayerCheck>> Create(BasePlayerCheck newModel)
    {
        try
        {
            var playerCheck = new BasePlayerCheck
            {
                moderatorId = newModel.moderatorId,
                steamId = newModel.steamId,
                discordId = newModel.discordId,
                result = newModel.result,
                date = newModel.date,
                comment = newModel.comment
            };

            await _playerCheckSheetRepository.Add(playerCheck);

            return new BaseResponse<BasePlayerCheck>
            {
                StatusCode = StatusCode.OK,
                Data = playerCheck
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<BasePlayerCheck>
            {
                Description = $"[CreatePlayerCheck] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<List<BasePlayerCheck>>> GetAll()
    {
        var baseResponse = new BaseResponse<List<BasePlayerCheck>>();

        try
        {
            var resource = await _playerCheckSheetRepository.GetAll();

            if (resource == null)
            {
                baseResponse.Description = "No one elements";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            baseResponse.Data = resource.ToList();
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<BasePlayerCheck>>
            {
                Description = $"[CreatePlayerCheck] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<BasePlayerCheck>> Get(string playerId)
    {
        throw new NotImplementedException();
    }

    public async Task<IBaseResponse<BasePlayerCheck>> Update(BasePlayerCheck newModel)
    {
        throw new NotImplementedException();
    }

    public async Task<IBaseResponse<BasePlayerCheck>> Delete(string playerId)
    {
        throw new NotImplementedException();
    }
}