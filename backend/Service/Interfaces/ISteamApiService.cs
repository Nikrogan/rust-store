namespace RustStats.Service.Interfaces
{
    public interface ISteamApiService
    {
        Task<string> GetAvatarUrlAsync(string steamId);

    }
}
