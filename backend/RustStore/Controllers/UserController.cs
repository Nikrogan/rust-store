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
using Domain.SimpleEntity;
using Microsoft.AspNetCore.Antiforgery;
using Newtonsoft.Json;

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
                Console.WriteLine(jwt);
                var response = await _userService.GetUserBySessionId(jwt);
                Console.WriteLine(response.Data.SteamId);
                Console.WriteLine(response.Data.AvatarUrl);
                return new BaseServerResponse<SimpleUser>(new SimpleUser(response.Data), response.StatusCode);
            }
            return new BaseServerResponse<SimpleUser>(null, Domain.Enum.StatusCode.InternalServerError);
        }

        [AllowAnonymous]
        [HttpGet("auth")]
        public async Task<IActionResult> Login()
        {
            var queryString = new System.Collections.Specialized.NameValueCollection
            {
                { "openid.ns", "http://specs.openid.net/auth/2.0" },
                { "openid.claimed_id", "http://specs.openid.net/auth/2.0/identifier_select" },
                { "openid.identity", "http://specs.openid.net/auth/2.0/identifier_select" },
                { "openid.return_to", "https://turringrust.ru/api/v1/user/steam-callback" },
                { "openid.realm", "https://turringrust.ru/api/" },
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

            var identity = HttpContext.Request.Query["openid.identity"].ToString();

                var steamId = identity.Split('/').Last();
            Console.WriteLine(steamId.ToString());
                var response = await _userService.LoginUser(steamId);
            Console.WriteLine(response.StatusCode.ToString());
            Console.WriteLine("[login user] : " +response.Data.SteamId);
            Console.WriteLine("[login user] : " +response.Data.AvatarUrl);
            if (response.StatusCode == Domain.Enum.StatusCode.OK)
                {

                    var activeUserResponse = response.Data;

                    var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

                    var jwtToken = new JwtSecurityTokenHandler().WriteToken(jwt);

                    activeUserResponse.SessionId = jwtToken;
                    activeUserResponse.LastAuth = DateTime.Now;
                    var uydf = await _userService.EditElement(activeUserResponse);
                Console.WriteLine(uydf.StatusCode.ToString());
                Console.WriteLine("[login user] : " + uydf.Data.SteamId);
                Console.WriteLine("[login user] : " + uydf.Data.AvatarUrl);

                Response.Cookies.Append("session", jwtToken, new CookieOptions
                    {
                        HttpOnly = true, // Защита от JavaScript-доступа
                        SameSite = SameSiteMode.None, // Можете установить другое значение в зависимости от ваших требований
                        Secure = true, // Устанавливаем, если используется HTTPS
                        MaxAge = TimeSpan.FromHours(12) // Время жизни куки
                    });

                //await Response.WriteAsJsonAsync(new AuthDto
                //{
                //    ClientUrl = "https://turringrust.ru",
                //    User = activeUserResponse
                //});

                return Redirect("https://turringrust.ru");

                

                string htmlContent = @"
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>Authenticated</title>
                        </head>
                        <body>
                            Authenticated successfully.
                            <script>
                                window.opener.postMessage({
                                      ok: true
                                    }, 'https://turringrust.ru');
                                
                            </script>
                        </body>
                    </html>";

                        // Возвращаем результат
                        return Content(htmlContent, "text/html");
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
