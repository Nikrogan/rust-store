using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entity;

public class SimpleServer
{

    public ulong ServerKey { get; set; }

    public string Ip { get; set; }
    public int GamePort { get; set; }
    public string Name { get; set; }

    public int MaxPlayers { get; set; }
    public int ActivePlayers { get; set; }
    public int QueuePlayers { get; set; }
}