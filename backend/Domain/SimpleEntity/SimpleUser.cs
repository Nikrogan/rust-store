using Domain.Entity;
using Domain.Enum;

namespace Domain.SimpleEntity
{
    public class SimpleUser
    {
        public SimpleUser(BaseUser? user) 
        {
            if (user == null)
                return;

            SteamId = user.SteamId;
            AvatarUrl = user.AvatarUrl;
            Balance = user.Balance;
            DisplayName = user.DisplayName;
            PersonalDiscount = user.PersonalDiscount;
            Role = user.Role;
        }

        public string SteamId { get; set; }
        public string DisplayName { get; set; }
        public string AvatarUrl { get; set; }
        public decimal Balance { get; set; }
        public int PersonalDiscount { get; set; }
        public Role Role { get; set; }

    }
}
