using Domain.Enum;

namespace Domain.SimpleEntity
{
    public class SimpleProduct
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ProductType ProductType { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public CategoryType CategoryType { get; set; }
    }
}
