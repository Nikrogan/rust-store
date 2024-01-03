using AspNet.Security.OpenId.Steam;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System.Security.Claims;
using MongoDB.Bson;
using Domain.Entity;
using System.Text;

namespace RustStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IHttpClientFactory _httpClientFactory;
        public UserController(IUserService accountService, IHttpClientFactory httpClientFactory)
        {
            _userService = accountService;
            _httpClientFactory = httpClientFactory;
        }

        // GET: api/<ValuesController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<ValuesController>/5
        //[HttpGet("{id}")]
        //public async Task<string> Get(string id)
        //{
        //    var response = await _userService.GetUserBySteamId(id);
        //    if (response.StatusCode == Domain.Enum.StatusCode.OK)
        //    {
        //        return response.Data.ToJson();
        //    }
        //    else
        //    {
        //        return response.Description;
        //    }
        //}

        //[HttpPost]
        //public async Task<string> Create()
        //{
        //    var newUser = new BaseUser
        //    {
        //        AvatarUrl = "fdsfsdf",
        //        DisplayName = "Name",
        //        Role = Domain.Enum.Role.Admin,
        //        RuWallet = 152.12m,
        //        SteamId = "54837583476843"
        //    };

        //    var response = await _userService.CreateUser(newUser);
        //    if (response.StatusCode == Domain.Enum.StatusCode.OK)
        //    {
        //        return response.Data.ToJson();
        //    }
        //    else
        //    {
        //        return response.Description;
        //    }
        //}

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

        [AllowAnonymous]
        [HttpGet("steam-login")]
        public IActionResult Login()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action(nameof(SteamCallback)),
            };

            return Challenge(properties, SteamAuthenticationDefaults.AuthenticationScheme);
        }


        //[ValidateAntiForgeryToken]
        //[HttpPost]
        //public async Task<IActionResult> Logout()
        //{
        //    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //    return RedirectToAction("Index", "Home");
        //}

        [HttpGet("access-denied")]
        public IActionResult AccessDenied()
        {
            return BadRequest("Access denied");
        }

        [HttpGet("steam-callback")]
        public async Task<IActionResult> SteamCallback()
        {
            var result = await HttpContext.AuthenticateAsync(SteamAuthenticationDefaults.AuthenticationScheme);
            if (result.Succeeded)
            {
                var steamId = result.Principal.FindFirstValue(ClaimTypes.NameIdentifier).Split('/').Last();
                var response = await _userService.LoginUser(steamId);

                if (response.StatusCode == Domain.Enum.StatusCode.OK)
                {
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(response.Data));


                    var activeUserResponse = await _userService.GetUserBySteamId(User.Identity.Name);

                    var jsonModel = Newtonsoft.Json.JsonConvert.SerializeObject(activeUserResponse.Data);
                    var content = new StringContent(jsonModel, Encoding.UTF8, "application/json");

                    var redirectUrl = "http://localhost:3000/";

                    return Redirect(redirectUrl);
                    
                }
                else
                {
                    return BadRequest("Login failed");
                }
            }
            return BadRequest("Login failed");
        }
    }
}
