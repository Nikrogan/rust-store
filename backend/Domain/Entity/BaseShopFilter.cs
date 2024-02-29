using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entity;

public class BaseShopFilter
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Title { get; set; }
}