using DAL.Interfaces;
using Domain.Entity;
using Domain.Enum;
using Domain.Response;
using Service.A2S;
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

    public async Task<IBaseResponse<SimpleServer>> GetInfo(ulong serverKey)
    {
        try
        {
            var baseResponse = new BaseResponse<SimpleServer>();
            var allServers = await _ServerRepository.GetAll();
            var currentServer = allServers.FirstOrDefault(x => serverKey == x.ServerKey);

            if (currentServer == null)
            {
                baseResponse.Description = "Server not found";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            var serverInfo = new SimpleServer
            {
                ServerKey = currentServer.ServerKey,
                Ip = currentServer.Ip,
                GamePort = currentServer.GamePort,
                Name = currentServer.Name,
                MaxPlayers = 0,
                ActivePlayers = 0,
                QueuePlayers = 0,
                IsOnline = false
            };

            var queryInfo = Server.Query(currentServer.Ip, currentServer.QueryPort,15);

            if (queryInfo is Exception)
            {
                baseResponse.Data = serverInfo;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }

            var infoKeyWords = FormatKeyWords((string)queryInfo.Keywords);

            serverInfo.MaxPlayers = infoKeyWords.MaximumPlayers;
            serverInfo.ActivePlayers = infoKeyWords.CurrentPlayers;
            serverInfo.QueuePlayers = infoKeyWords.QueuedPlayers;
            serverInfo.IsOnline = true;

            baseResponse.Data = serverInfo;
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<SimpleServer>
            {
                Description = $"[GetInfo] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<List<SimpleServer>>> GetAllInfo()
    {
        try
        {
            var baseResponse = new BaseResponse<List<SimpleServer>>();
            var allServers = await _ServerRepository.GetAll();

            if (!allServers.Any())
            {
                baseResponse.Description = "Servers not found";
                baseResponse.StatusCode = StatusCode.ElementNotFound;
                return baseResponse;
            }

            var infoServersList = new List<SimpleServer>();

            foreach (var currentServer in allServers)
            {
                var serverInfo = new SimpleServer
                {
                    ServerKey = currentServer.ServerKey,
                    Ip = currentServer.Ip,
                    GamePort = currentServer.GamePort,
                    Name = currentServer.Name,
                    MaxPlayers = 0,
                    ActivePlayers = 0,
                    QueuePlayers = 0,
                    IsOnline = false
                };

                var queryInfo = Server.Query(currentServer.Ip, currentServer.QueryPort, 15);

                if (queryInfo is Exception)
                {
                    infoServersList.Add(serverInfo);
                    continue;
                }

                var infoKeyWords = FormatKeyWords((string)queryInfo.Keywords);

                serverInfo.MaxPlayers = infoKeyWords.MaximumPlayers;
                serverInfo.ActivePlayers = infoKeyWords.CurrentPlayers;
                serverInfo.QueuePlayers = infoKeyWords.QueuedPlayers;
                serverInfo.IsOnline = true;
                infoServersList.Add(serverInfo);
            }

            baseResponse.Data = infoServersList;
            baseResponse.StatusCode = StatusCode.OK;
            return baseResponse;
        }
        catch (Exception ex)
        {
            return new BaseResponse<List<SimpleServer>>
            {
                Description = $"[GetAllInfo] : {ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    private class InfoKeyWords
    {
        public int CurrentPlayers { get; set; }
        public int MaximumPlayers { get; set; }
        public int QueuedPlayers { get; set; }
    }

    private InfoKeyWords FormatKeyWords(string keywords)
    {
        var info = new InfoKeyWords();

        var splittedWords = keywords.Split(',');

        foreach (var word in splittedWords) {
            if (word.StartsWith("cp"))
            {
                info.CurrentPlayers = int.Parse(word.Replace("cp", ""));
                continue;
            }
            if (word.StartsWith("mp"))  
            { 
                info.MaximumPlayers = int.Parse(word.Replace("mp", ""));
                continue;
            }
            if (word.StartsWith("qp"))
            { 
                info.QueuedPlayers = int.Parse(word.Replace("qp", ""));
                continue;
            }
        }

        return info;
    }
}