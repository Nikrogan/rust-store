using Domain.Entity;
using Domain.Enum;

namespace Domain.SimpleEntity
{
    public class SimpleProduct
    {
        public int? ItemID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string GiveCommand {  get; set; }
        public ProductType ProductType { get; set; }
        public int Chance {  get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public CategoryType CategoryType { get; set; }
        public List<SimpleProduct>? PackProducts { get; set; }
    }
}
