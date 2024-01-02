using Newtonsoft.Json.Linq;

namespace RustStats.Service.Interfaces
{
    public interface ISteamApiService
    {
        string? GetAvatarUrl(JObject playerInfo);
        string? GetDisplayName(JObject playerInfo);
        Task<JObject> GetPlayerInfoAsync(string steamId);

    }
}
