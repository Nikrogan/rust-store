using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace RustStore.Controllers.Default;

[Route("api/v1/server")]
[ApiController]
public class ServerController : ControllerBase
{
    private readonly IServerService _serverService;

    public ServerController(IServerService serverService)
    {
        _serverService = serverService;
    }

    [HttpGet("{id}")]
    public async Task<IBaseServerResponse<SimpleServer>> GetInfo(ulong id)
    {
        var response = await _serverService.GetInfo(id);
        return new BaseServerResponse<SimpleServer>(response.Data, response.StatusCode);
    }

    [HttpGet]
    public async Task<IBaseServerResponse<List<SimpleServer>>> GetAllInfo()
    {
        var response = await _serverService.GetAllInfo();
        return new BaseServerResponse<List<SimpleServer>>(response.Data, response.StatusCode);
    }
}