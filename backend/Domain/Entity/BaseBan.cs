using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Domain.Enum;

namespace Domain.Entity
{
    public class BaseBan
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string DisplayName { get; set; }
        public string SteamId { get; set; }
        public DateTime DateTime {  get; set; }
        public DateTime UnbanDateTime {  get; set; }
        public ulong Duration {  get; set; }
        public BanStatus Status {  get; set; }
        public ulong ServerKey { get; set; }
        public string? Reason {  get; set; }
        public List<string> ProofImages { get; set; }

    }
}
