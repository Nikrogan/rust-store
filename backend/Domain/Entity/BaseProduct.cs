

using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Domain.Enum;
using Domain.SimpleEntity;

namespace Domain.Entity
{
    public class BaseProduct
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int? ProductId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string GiveCommand { get; set; }
        public ProductType ProductType { get; set; }
        public decimal Price { get; set; }
        public int Discount {  get; set; }
        public ulong ServerKey { get; set; }
        public string ImageUrl { get; set; }
        public bool IsActive {  get; set; }
        public CategoryType CategoryType { get; set; }
        public List<SimpleProduct>? SimpleProducts { get; set; }
    }
}
