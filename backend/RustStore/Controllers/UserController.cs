using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System.Security.Claims;
using Domain.Entity;
using System.Text;
using Domain.Response;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Domain.SimpleEntity;

namespace RustStore.Controllers
{
    [Route("api/v1/user")]
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

        [HttpGet]
        public async Task<IBaseServerResponse<SimpleUser>> Profile()
        {
            if (Request.Cookies.TryGetValue("session", out var jwt))
            {
                var response = await _userService.GetUserBySessionId(jwt);
                return new BaseServerResponse<SimpleUser>(new SimpleUser(response.Data), response.StatusCode);
            }
            return new BaseServerResponse<SimpleUser>(null, Domain.Enum.StatusCode.InternalServerError);
        }

        [HttpGet("logout")]
        public async Task<IBaseServerResponse<string>> Logout()
        {
            Response.Cookies.Append("session", "", new CookieOptions
            {
                HttpOnly = true, // Защита от JavaScript-доступа
                SameSite = SameSiteMode.None, // Можете установить другое значение в зависимости от ваших требований
                Secure = true, // Устанавливаем, если используется HTTPS
                MaxAge = TimeSpan.FromHours(0) // Время жизни куки
            });
            Response.Cookies.Append("role", "", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                MaxAge = TimeSpan.FromHours(0)
            });
            return new BaseServerResponse<string>(null, Domain.Enum.StatusCode.OK);

        }

        [HttpPost]
        public async Task<IBaseServerResponse<string>> Edit(UserEditModel userEditModel)
        {
            if (!Request.Cookies.TryGetValue("session", out var jwt))
                return new BaseServerResponse<string>("", Domain.Enum.StatusCode.AccessDenied);

            var user = await _userService.GetUserBySessionId(jwt);
            if (user == null)
                return new BaseServerResponse<string>("", Domain.Enum.StatusCode.AccessDenied);

            if(user.Data.SteamId != userEditModel.SteamId && user.Data.Role != Domain.Enum.Role.Owner)
                return new BaseServerResponse<string>("", Domain.Enum.StatusCode.AccessDenied);

            if (user.Data.SteamId == userEditModel.SteamId && userEditModel.Role != null && user.Data.Role != userEditModel.Role)
                return new BaseServerResponse<string>("", Domain.Enum.StatusCode.AccessDenied);

            var response = await _userService.EditElementFront(userEditModel);
            return new BaseServerResponse<string>("", response.StatusCode);
        }

        [AllowAnonymous]
        [HttpGet("auth")]
        public async Task<IActionResult> Login()
        {
            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("backendUrl");
            var queryString = new System.Collections.Specialized.NameValueCollection
            {
                { "openid.ns", "http://specs.openid.net/auth/2.0" },
                { "openid.claimed_id", "http://specs.openid.net/auth/2.0/identifier_select" },
                { "openid.identity", "http://specs.openid.net/auth/2.0/identifier_select" },
                { "openid.return_to", $"{link}/api/v1/user/steam-callback" },
                { "openid.realm", link },
                { "openid.mode", "checkid_setup" }
            };

            var requestUrl = "https://steamcommunity.com/openid/login?" + ToQueryString(queryString);

            return Redirect(requestUrl);
        }

        private string ToQueryString(System.Collections.Specialized.NameValueCollection nvc)
        {
            return string.Join("&", nvc.AllKeys.Select(key => $"{key}={System.Web.HttpUtility.UrlEncode(nvc[key])}"));
        }

        [HttpGet("steam-callback")]
        public async Task<IActionResult> SteamCallback()
        {
            if (!HttpContext.Request.Query.ContainsKey("openid.identity"))
                return BadRequest();

            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("frontUrl");

            var verifyUrl = "https://steamcommunity.com/openid/login" + HttpContext.Request.QueryString.ToString().Replace("id_res", "check_authentication");
            
            HttpClient httpClient = new HttpClient();
            var verifyResponse = await httpClient.GetStringAsync(verifyUrl);

            if (verifyResponse.Contains("is_valid:false"))
            {
                Console.WriteLine("СУКА ПОДДЕЛЫВАЕТ СТИМ АЙЙДИ");
                return Redirect(link);
            }

            var identity = HttpContext.Request.Query["openid.identity"].ToString();
            var steamId = identity.Split('/').Last();
            var response = await _userService.LoginUser(steamId);

            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                {

                    var claims = new List<Claim> { new Claim(ClaimTypes.Name, steamId) };
                    var activeUserResponse = response.Data;

                    var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

                    var jwtToken = new JwtSecurityTokenHandler().WriteToken(jwt);

                    activeUserResponse.SessionId = jwtToken;
                    activeUserResponse.LastAuth = DateTime.Now;
                    await _userService.EditElement(activeUserResponse);

                Response.Cookies.Append("session", jwtToken, new CookieOptions
                    {
                        HttpOnly = true, // Защита от JavaScript-доступа
                        SameSite = SameSiteMode.None, // Можете установить другое значение в зависимости от ваших требований
                        Secure = true, // Устанавливаем, если используется HTTPS
                        MaxAge = TimeSpan.FromHours(12) // Время жизни куки
                    });

                Response.Cookies.Append("role", response.Data.Role.ToString(), new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None, 
                    Secure = true, 
                    MaxAge = TimeSpan.FromHours(12)
                });



                return Redirect(link);

                }
            return BadRequest();
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
