using Domain.Enum;

namespace Domain.Entity
{
    public class UserEditModel
    {
        public decimal Balance { get; set; }
        public int PersonalDiscount { get; set; }
        public Role? Role { get; set; }
    }
}
