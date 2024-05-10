using DAL.Interfaces;
using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Service.Interfaces;
using System.Xml.Linq;

namespace Service.Implementations;

public class ServerService : IServerService
{
    private readonly IBaseRepository<BaseServer> _ServerRepository;

    public ServerService(IBaseRepository<BaseServer> shopFiltersRepository)
    {
        _ServerRepository = shopFiltersRepository;
    }

    public async Task<IBaseResponse<List<BaseServer>>> Create(BaseServer server)
    {
        var baseResponse = new BaseResponse<List<BaseServer>>();
        try
        {
            var newServer = new BaseServer
            {
                ServerKey = server.ServerKey,
                QueryPort = server.QueryPort,
                GamePort = server.GamePort,
                RconPort = server.RconPort,
                RconPassword = server.RconPassword,
                Ip = server.Ip,
                Name = server.Name
            };

            await _ServerRepository.Add(newServer);
            var newBaseServerList = await _ServerRepository.GetAll();
            baseResponse.StatusCode = StatusCode.OK;
            baseResponse.Data = newBaseServerList.ToList();
            return new BaseResponse<List<BaseServer>>
            {
                StatusCode = StatusCode.OK,
                Data = newBaseServerList.ToList()
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<BaseServer>>
            {
                Description = $"[CreateServer] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<List<BaseServer>>> GetAll()
    {
        var baseResponse = new BaseResponse<List<BaseServer>>();
        try
        {
            var serverList = await _ServerRepository.GetAll();
            if (!serverList.Any())
            {
                baseResponse.Description = "No one element";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            baseResponse.Data = serverList.ToList();
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<BaseServer>>
            {
                Description = $"[GetAllShopFilters] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<List<BaseServer>>> Delete(string Id)
    {
        var baseResponse = new BaseResponse<List<BaseServer>>();
        try
        {
            var allElements = await _ServerRepository.GetAll();
            var element = allElements.FirstOrDefault(x => x.Id == Id);

            if (element == null)
            {
                baseResponse.Description = "Server not found";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            await _ServerRepository.Delete(element);

            baseResponse.Data = allElements.Where(x => x.Id != Id).ToList();
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<BaseServer>>
            {
                Description = $"[FilterDelete] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<BaseServer>> Get(string Id)
    {
        try
        {
            var baseResponse = new BaseResponse<BaseServer>();
            var allServers = await _ServerRepository.GetAll();
            var currentServer = allServers.FirstOrDefault(x => Id == x.Id);

            if (currentServer == null)
            {
                baseResponse.Description = "Server not found";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            baseResponse.Data = currentServer;
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<BaseServer>
            {
                Description = $"[ServerGet] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<List<BaseServer>>> Update(BaseServer server)
    {
        var baseResponse = new BaseResponse<List<BaseServer>>();
        var allServers = await _ServerRepository.GetAll();
        var currentServer = allServers.FirstOrDefault(x => server.Id == x.Id);
        try
        {
            currentServer.ServerKey = server.ServerKey;
            currentServer.QueryPort = server.QueryPort;
            currentServer.GamePort = server.GamePort;
            currentServer.RconPort = server.RconPort;
            currentServer.RconPassword = server.RconPassword;
            currentServer.Ip = server.Ip;
            currentServer.Name = server.Name;

            await _ServerRepository.Update(currentServer);

            var newBaseServerList = await _ServerRepository.GetAll();
            baseResponse.StatusCode = StatusCode.OK;
            baseResponse.Data = newBaseServerList.ToList();

            return new BaseResponse<List<BaseServer>>
            {
                StatusCode = StatusCode.OK,
                Data = newBaseServerList.ToList()
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<BaseServer>>
            {
                Description = $"[CreateServer] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }
}