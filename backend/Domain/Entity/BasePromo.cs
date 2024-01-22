using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Domain.Entity
{
    public class BasePromo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string PromoCode { get; set; }
        public int MaxUses { get; set; }
        public int AlreadyUses { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int MoneyValue { get; set; }
        public int DiscountValue { get; set; }
        public bool IsActive { get; set; }
        public string? OwnerSteamId { get; set; }
    }
}
