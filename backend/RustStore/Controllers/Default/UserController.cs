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
using DotNetEnv;
using Service;

namespace RustStore.Controllers.Default
{
    [Route("api/v1/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService accountService)
        {
            _userService = accountService;
        }

        [HttpGet]
        [SessionAuthorize]
        public async Task<IBaseServerResponse<SimpleUser>> Profile()
        {
            if (HttpContext.Items["CurrentUser"] is not BaseUser user)
                return new BaseServerResponse<SimpleUser>(null, Domain.Enum.StatusCode.InternalServerError);

            return new BaseServerResponse<SimpleUser>(new SimpleUser(user), Domain.Enum.StatusCode.OK);
        }

        [HttpGet("logout")]
        public IBaseServerResponse<string> Logout()
        {
            Response.Cookies.Append("session", "", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                MaxAge = TimeSpan.FromHours(0)
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
        [SessionAuthorize]
        public async Task<IBaseServerResponse<string>> Edit(UserEditModel userEditModel)
        {
            if (HttpContext.Items["CurrentUser"] is not BaseUser user)
                return new BaseServerResponse<string>(null, Domain.Enum.StatusCode.InternalServerError);

            if (user.SteamId != userEditModel.SteamId && user.Role != Domain.Enum.Role.Owner)
                return new BaseServerResponse<string>("", Domain.Enum.StatusCode.AccessDenied);

            if (user.SteamId == userEditModel.SteamId && userEditModel.Role != null && user.Role != userEditModel.Role)
                return new BaseServerResponse<string>("", Domain.Enum.StatusCode.AccessDenied);

            var response = await _userService.EditElementFront(userEditModel);
            return new BaseServerResponse<string>("", response.StatusCode);
        }

        [AllowAnonymous]
        [HttpGet("auth")]
        public IActionResult Login()
        {
            Env.Load();
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


        [HttpGet("steam-callback")]
        public async Task<IActionResult> SteamCallback()
        {
            if (!HttpContext.Request.Query.ContainsKey("openid.identity"))
                return BadRequest();

            Env.Load();
            var link = Environment.GetEnvironmentVariable("frontUrl");

            if (string.IsNullOrEmpty(link))
                return BadRequest();

            var verifyUrl = "https://steamcommunity.com/openid/login" + HttpContext.Request.QueryString.ToString().Replace("id_res", "check_authentication");

            HttpClient httpClient = new();
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

                SetCookie("session", jwtToken);
                SetCookie("role", response.Data.Role.ToString());

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

        private static string ToQueryString(System.Collections.Specialized.NameValueCollection nvc) =>
            string.Join("&", nvc.AllKeys.Select(key => $"{key}={System.Web.HttpUtility.UrlEncode(nvc[key])}"));

        private void SetCookie(string name, string value)
        {
            Response.Cookies.Append(name, value, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                MaxAge = TimeSpan.FromHours(12)
            });
        }



    }
}
