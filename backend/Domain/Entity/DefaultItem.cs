using Domain.Enum;

namespace Domain.Entity
{
    public class DefaultItem
    {
        public int ItemId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public CategoryType Category { get; set; }
    }
}
