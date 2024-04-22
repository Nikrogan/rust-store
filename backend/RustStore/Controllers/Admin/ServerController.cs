using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers.Admin;

[Route("api/v1/admin/server")]
[ApiController]
[SessionAuthorize(2)]
public class ServerController : ControllerBase
{
    private readonly IServerService _serverService;

    public ServerController(IServerService serverService)
    {
        _serverService = serverService;
    }

    [HttpGet]
    public async Task<IBaseServerResponse<IEnumerable<BaseServer>>> GetAll()
    {
        var response = await _serverService.GetAll();
        return new BaseServerResponse<IEnumerable<BaseServer>>(response.Data, response.StatusCode);
    }

    [HttpPost]
    public async Task<IBaseServerResponse<List<BaseServer>>> Create(BaseServer server)
    {
        var response = await _serverService.Create(server);
        return new BaseServerResponse<List<BaseServer>>(response.Data, response.StatusCode);
    }

    [HttpGet("{id}")]
    public async Task<IBaseServerResponse<BaseServer>> Get(string id)
    {
        var response = await _serverService.Get(id);
        return new BaseServerResponse<BaseServer>(response.Data, response.StatusCode);
    }

    [HttpPut]
    public async Task<IBaseServerResponse<List<BaseServer>>> Update(BaseServer server)
    {
        var response = await _serverService.Update(server);
        return new BaseServerResponse<List<BaseServer>>(response.Data, response.StatusCode);
    }

    [HttpDelete("{id}")]
    public async Task<IBaseServerResponse<BaseServer>> Delete(string id)
    {
        var response = await _serverService.Delete(id);
        return new BaseServerResponse<BaseServer>(null, response.StatusCode);
    }
}