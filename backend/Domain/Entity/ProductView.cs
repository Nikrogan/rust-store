using Domain.Enum;
using Domain.SimpleEntity;

namespace Domain.Entity
{
    public class ProductView
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public ProductType ProductType { get; set; }
        public decimal Price { get; set; }
        public int Discount { get; set; }
        public ulong ServerKey { get; set; }
        public string ImageUrl { get; set; }
        public CategoryType CategoryType { get; set; }
        public List<ProductView>? InsideProducts { get; set; }

        public ProductView(BaseProduct product)
        {
            Title = product.Title;
            Description = product.Description;
            ProductType = product.ProductType;
            Price = product.Price;
            Discount = product.Discount;
            ServerKey = product.ServerKey;
            ImageUrl = product.ImageUrl;
            CategoryType = product.CategoryType;
            InsideProducts = product?.SimpleProducts?.ConvertAll(x => new ProductView(x));
        }

        public ProductView(SimpleProduct product)
        {
            Title = product.Title;
            Description = product.Description;
            ProductType = product.ProductType;
            Price = product.Price;
            ImageUrl = product.ImageUrl;
            CategoryType = product.CategoryType;
            InsideProducts = product?.PackProducts?.ConvertAll(x => new ProductView(x));
        }
    }
}
