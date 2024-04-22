using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers.Default
{
    [Route("api/v1/userbasket")]
    [ApiController]
    public class UserBasketController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserBasketController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [SessionAuthorize]
        public async Task<IBaseServerResponse<List<BaseProduct>>> GetPlayerBasket()
        {
            if (HttpContext.Items["CurrentUser"] is not BaseUser user)
                return new BaseServerResponse<List<BaseProduct>>(null, Domain.Enum.StatusCode.InternalServerError);

            var response = await _userService.GetUserBasket(user.SteamId);
            return new BaseServerResponse<List<BaseProduct>>(response.Data, response.StatusCode);
        }
    }
}
