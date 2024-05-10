using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entity;

public class BaseServer
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public ulong ServerKey {  get; set; }

    public string Ip { get; set; }

    public int GamePort { get; set; }
    public int RconPort { get; set; }
    public int QueryPort { get; set; }
    public int RconPassword { get; set; }
    
    public string Name { get; set; }
}