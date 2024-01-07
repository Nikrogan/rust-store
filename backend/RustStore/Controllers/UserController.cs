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
using Domain.Response;
using System.Net.WebSockets;
using Newtonsoft.Json;

namespace RustStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IHttpClientFactory _httpClientFactory;
        private static WebSocket _webSocket;

        public UserController(IUserService accountService, IHttpClientFactory httpClientFactory)
        {
            _userService = accountService;
            _httpClientFactory = httpClientFactory;
        }

        [AllowAnonymous]
        [HttpGet("steam-login")]
        public async Task<IActionResult> Login()
        {
            var context = ControllerContext.HttpContext;
            _webSocket = await context.WebSockets.AcceptWebSocketAsync();

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
        public async Task<IActionResult> AccessDenied()
        {
            _webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, null, CancellationToken.None);
            return BadRequest();
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

                    var jsonModel = JsonConvert.SerializeObject(activeUserResponse.Data);

                    await SendWebSocketMessageAsync(_webSocket, jsonModel);
                    await _webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure,null,CancellationToken.None);

                    var redirectUrl = "http://localhost:3000/authCallback";

                    return Redirect(redirectUrl);
                    
                }
                else
                {
                    return BadRequest("Login failed");
                }
            }
            return BadRequest("Login failed");
        }

        private async Task SendWebSocketMessageAsync(WebSocket webSocket, string message)
        {
            var buffer = System.Text.Encoding.UTF8.GetBytes(message);
            var segment = new ArraySegment<byte>(buffer);

            await webSocket.SendAsync(segment, WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}
