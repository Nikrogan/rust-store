using System.ComponentModel.DataAnnotations;

namespace Domain.Enum
{
    public enum Role
    {
        [Display(Name = "Пользователь")]
        Default = 0,
        [Display(Name = "Модератор")]
        Moderator = 1,
        [Display(Name = "Администратор")]
        Owner = 2,
    }
}
