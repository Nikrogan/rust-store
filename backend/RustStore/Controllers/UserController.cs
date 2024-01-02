using AspNet.Security.OpenId.Steam;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System.Security.Claims;
using MongoDB.Bson;
using Domain.Entity;

namespace RustStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService accountService)
        {
            _userService = accountService;
        }

        // GET: api/<ValuesController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<string> Get(string id)
        {
            var response = await _userService.GetUserBySteamId(id);
            if (response.StatusCode == Domain.Enum.StatusCode.OK)
            {
                return response.Data.ToJson();
            }
            else
            {
                return response.Description;
            }
        }

        [HttpPost]
        public async Task<string> Create()
        {
            var newUser = new BaseUser
            {
                AvatarUrl = "fdsfsdf",
                DisplayName = "Name",
                Role = Domain.Enum.Role.Admin,
                RuWallet = 152.12m,
                SteamId = "54837583476843"
            };

            var response = await _userService.CreateUser(newUser);
            if (response.StatusCode == Domain.Enum.StatusCode.OK)
            {
                return response.Data.ToJson();
            }
            else
            {
                return response.Description;
            }
        }

        //// POST api/<ValuesController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<ValuesController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<ValuesController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}

        //[AllowAnonymous]
        //[HttpGet]
        //public IActionResult Login(string returnUrl = "/")
        //{
        //    var properties = new AuthenticationProperties
        //    {
        //        RedirectUri = Url.Action(nameof(SteamCallback)),
        //    };

        //    return Challenge(properties, SteamAuthenticationDefaults.AuthenticationScheme);
        //}


        //[ValidateAntiForgeryToken]
        //[HttpPost]
        //public async Task<IActionResult> Logout()
        //{
        //    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //    return RedirectToAction("Index", "Home");
        //}

        //[HttpGet("access-denied")]
        //public string AccessDenied()
        //{
        //    return "denied";
        //}

        //[HttpGet("steam-callback")]
        //public async Task<string> SteamCallback()
        //{
        //    var result = await HttpContext.AuthenticateAsync(SteamAuthenticationDefaults.AuthenticationScheme);
        //    if (result.Succeeded)
        //    {
        //        var steamId = result.Principal.FindFirstValue(ClaimTypes.NameIdentifier).Split('/').Last();
        //        var response = await _userService.LoginUser(steamId);

        //        if (response.StatusCode == Domain.Enum.StatusCode.OK)
        //        {
        //            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
        //                new ClaimsPrincipal(response.Data));
        //            return "u arge logined";
        //        }
        //        else
        //        {
        //            return response.StatusCode.ToString();
        //        }
        //    }
        //    return "unkerror";
        //}
    }
}
