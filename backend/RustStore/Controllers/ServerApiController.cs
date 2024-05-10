using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace RustStore.Controllers
{
    [Route("api/v1/serverapi")]
    [ApiController]
    public class ServerApiController : ControllerBase
    {
        private readonly IUserService _userService;
        public ServerApiController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{steamID}")]
        public async Task<IBaseServerResponse<List<BaseProduct>>> GetPlayerBasket(string steamID)
        {
            var response = await _userService.GetUserBasket(steamID);
            return new BaseServerResponse<List<BaseProduct>>(response.Data, response.StatusCode);
        }
    }
}
