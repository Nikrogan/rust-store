using Domain.Entity;
using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace RustStore.Controllers
{
    [Route("api/v1/userpromo")]
    public class UserPromoController : Controller
    {
        private readonly IUserService _userService;
        public UserPromoController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("steamId")]
        public async Task<IBaseServerResponse<IEnumerable<UserActivatedPromo>>> Get(string steamId)
        {
            var response = await _userService.GetUserActivatedPromo(steamId);
            return new BaseServerResponse<IEnumerable<UserActivatedPromo>>(response.Data, response.StatusCode);
        }
    }
}
