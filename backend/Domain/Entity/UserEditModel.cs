using Domain.Enum;

namespace Domain.Entity
{
    public class UserEditModel
    {
        public string SteamId {  get; set; }
        public decimal Balance { get; set; }
        public int PersonalDiscount { get; set; }
        public Role? Role { get; set; }
    }
}
