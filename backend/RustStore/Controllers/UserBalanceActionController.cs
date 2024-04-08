using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;

namespace RustStore.Controllers
{
    [Route("api/v1/userbalanceaction")]
    [ApiController]
    public class UserBalanceActionController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserBalanceActionController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{steamId}")]
        [SessionAuthorize(2)]
        public async Task<IBaseServerResponse<IEnumerable<BalanceActionModel>>> Get(string steamId)
        {
            var response = await _userService.GetUserBalanceAction(steamId);
            return new BaseServerResponse<IEnumerable<BalanceActionModel>>(response.Data, response.StatusCode);
        }

        [HttpGet]
        [SessionAuthorize]
        public async Task<IBaseServerResponse<IEnumerable<BalanceActionModel>>> Get()
        {
            if (HttpContext.Items["CurrentUser"] is not BaseUser user)
                return new BaseServerResponse<IEnumerable<BalanceActionModel>>(null, Domain.Enum.StatusCode.InternalServerError);

            var response = await _userService.GetUserBalanceAction(user.SteamId);
            return new BaseServerResponse<IEnumerable<BalanceActionModel>>(response.Data, response.StatusCode);
        }
    }
}
