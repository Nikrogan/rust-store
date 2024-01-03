using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using RustStats.Service.Interfaces;

namespace RustStats.Service.Implementations
{
    public class SteamApiService : ISteamApiService
    {
        private const string SteamApiBaseUrl = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";

        private readonly HttpClient _httpClient;
        private readonly string? _apiKey;

        public SteamApiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["SteamApi:ApiKey"];
        }

        public string? GetAvatarUrl(JObject playerInfo)
        {
            string? avatarUrl = playerInfo["response"]?["players"]?.FirstOrDefault()?["avatarfull"]?.ToString();
            return avatarUrl;
        }

        public string? GetDisplayName(JObject playerInfo)
        {
            string? displayName = playerInfo["response"]?["players"]?.FirstOrDefault()?["personaname"]?.ToString();
            return displayName;
        }

        public async Task<JObject> GetPlayerInfoAsync(string steamId)
        {
            var apiUrl = $"{SteamApiBaseUrl}?key={_apiKey}&steamids={steamId}";

            var response = await _httpClient.GetStringAsync(apiUrl);
            var jsonObject = JObject.Parse(response);

            return jsonObject;
        }
    }
}
