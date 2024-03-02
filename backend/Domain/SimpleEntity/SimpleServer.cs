using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entity;

public class SimpleServer
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string gamePort { get; set; }
    public int ip { get; set; }
    public int name { get; set; }
    public int queryPort { get; set; }
}