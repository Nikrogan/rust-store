using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace RustStore.Controllers
{
    [Route("api/v1/userbalanceaction")]
    public class UserBalanceActionController : Controller
    {
        private readonly IUserService _userService;
        public UserBalanceActionController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{steamId}")]
        public async Task<IBaseServerResponse<IEnumerable<BalanceActionModel>>> Get(string steamId)
        {
            var response = await _userService.GetUserBalanceAction(steamId);
            return new BaseServerResponse<IEnumerable<BalanceActionModel>>(response.Data, response.StatusCode);
        }
    }
}
