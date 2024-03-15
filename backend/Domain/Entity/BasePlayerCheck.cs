using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entity;

public class BasePlayerCheck
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string moderatorId { get; set; }
    public string steamId { get; set; }
    public string discordId { get; set; }
    public string result { get; set; }
    public string comment { get; set; }
    public string date { get; set; }
}