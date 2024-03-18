using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace RustStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserBasketController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserBasketController(IUserService userService)
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
