using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Domain.Entity
{
    public class BaseShopFilters
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Title { get; set; }
        public int value { get; set; }
    }
}