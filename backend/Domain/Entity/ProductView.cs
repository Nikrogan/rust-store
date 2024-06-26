﻿using Domain.Enum;
using Domain.SimpleEntity;

namespace Domain.Entity
{
    public class ProductView
    {
        public string? Id {  get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ProductType ProductType { get; set; }
        public decimal Price { get; set; }
        public int Amount { get; set; }
        public int? MinAmount {  get; set; }
        public int Discount { get; set; }
        public ulong ServerKey { get; set; }
        public int? Chance {  get; set; }
        public string ImageUrl { get; set; }
        public CategoryType CategoryType { get; set; }
        public List<ProductView>? InsideProducts { get; set; }

        public ProductView(BaseProduct product)
        {
            Id = product.Id;
            Title = product.Title;
            Description = product.Description;
            ProductType = product.ProductType;
            Amount = product.Amount;
            Price = product.Price;
            Discount = product.Discount;
            Chance = null;
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
            Amount = product.Amount;
            MinAmount = product.MinAmount;
            Chance = product.Chance;
            ImageUrl = product.ImageUrl;
            CategoryType = product.CategoryType;
            InsideProducts = product?.PackProducts?.ConvertAll(x => new ProductView(x));
        }
    }
}
