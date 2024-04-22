using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers.Admin;

[Route("api/v1/admin/playercheck")]
[ApiController]
public class PlayerCheckSheetController : ControllerBase
{
    private readonly IPlayerCheckSheetService _PlayerCheckSheetService;

    public PlayerCheckSheetController(IPlayerCheckSheetService PlayerCheckSheetController)
    {
        _PlayerCheckSheetService = PlayerCheckSheetController;
    }

    [HttpGet]
    [SessionAuthorize(1)]
    public async Task<IBaseServerResponse<List<BasePlayerCheck>>> GetAll()
    {
        var response = await _PlayerCheckSheetService.GetAll();
        return new BaseServerResponse<List<BasePlayerCheck>>(response.Data, response.StatusCode);
    }

    [HttpPost]
    [SessionAuthorize(1)]
    public async Task<IBaseServerResponse<BasePlayerCheck>> Create(BasePlayerCheck newsModel)
    {
        var response = await _PlayerCheckSheetService.Create(newsModel);
        return new BaseServerResponse<BasePlayerCheck>(response.Data, response.StatusCode);
    }

    [HttpGet("{id}")]
    [SessionAuthorize(1)]
    public async Task<IBaseServerResponse<BasePlayerCheck>> Get(string playerId)
    {
        var response = await _PlayerCheckSheetService.Get(playerId);
        return new BaseServerResponse<BasePlayerCheck>(response.Data, response.StatusCode);
    }

    [HttpPut]
    [SessionAuthorize(1)]
    public async Task<IBaseServerResponse<BasePlayerCheck>> Update(BasePlayerCheck newPlayer)
    {
        var response = await _PlayerCheckSheetService.Update(newPlayer);
        return new BaseServerResponse<BasePlayerCheck>(response.Data, response.StatusCode);
    }

    [HttpDelete("{id}")]
    [SessionAuthorize(1)]
    public async Task<IBaseServerResponse<BasePlayerCheck>> Delete(string playerId)
    {
        var response = await _PlayerCheckSheetService.Delete(playerId);
        return new BaseServerResponse<BasePlayerCheck>(null, response.StatusCode);
    }
}