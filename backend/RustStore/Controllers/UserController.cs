using AspNet.Security.OpenId.Steam;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System.Security.Claims;
using Domain.Entity;
using System.Text;
using Domain.Response;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

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

        [HttpGet("profile")]
        public async Task<IBaseServerResponse<SimpleUser>> Profile()
        {
            if (Request.Cookies.TryGetValue("session", out var jwt))
            {
                var response = await _userService.GetUserBySessionId(jwt);
                return new BaseServerResponse<SimpleUser>(new SimpleUser(response.Data), response.StatusCode);
            }
            return new BaseServerResponse<SimpleUser>(null, Domain.Enum.StatusCode.InternalServerError);
        }

        [AllowAnonymous]
        [HttpGet("steam-login")]
        public async Task<IActionResult> Login()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action(nameof(SteamCallback))
            };
            return Challenge(properties, SteamAuthenticationDefaults.AuthenticationScheme);
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

                    var activeUserResponse = await _userService.GetUserBySteamId(steamId);

                    var claims = new List<Claim> { new Claim(ClaimTypes.Name, steamId) };
                    var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

                    var jwtToken = new JwtSecurityTokenHandler().WriteToken(jwt);

                    activeUserResponse.Data.SessionId = jwtToken;
                    activeUserResponse.Data.LastAuth = DateTime.Now;
                    await _userService.EditElement(activeUserResponse.Data);

                    Response.Cookies.Append("session", jwtToken, new CookieOptions
                    {
                        HttpOnly = true, // Защита от JavaScript-доступа
                        SameSite = SameSiteMode.None, // Можете установить другое значение в зависимости от ваших требований
                        Secure = Request.IsHttps, // Устанавливаем, если используется HTTPS
                        MaxAge = TimeSpan.FromHours(12) // Время жизни куки
                    });

                    var frontendUrl = "https://localhost:3000";
                    return Redirect(frontendUrl);
                }
                else
                {
                }
            }
            return NoContent();
        }

        public class AuthOptions
        {
            public const string ISSUER = "RustStore"; // издатель токена
            public const string AUDIENCE = "BWRS"; // потребитель токена
            const string KEY = "mysupersecret_secretsecretsecretkey!123";   // ключ для шифрации
            public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }

        
    }
}
