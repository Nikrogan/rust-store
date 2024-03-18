using MongoDB.Bson.Serialization.Attributes;
﻿using Domain.Enum;
using MongoDB.Bson;

namespace Domain.Entity
{
    public class BaseUser
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? SteamId { get; set; }
        public string? DisplayName { get; set; }
        public string? AvatarUrl { get; set; }
        public decimal Balance { get; set; }
        public int PersonalDiscount { get; set; }
        public Role? Role { get; set; }
        public string? SessionId { get; set; }
        public DateTime LastAuth { get; set; }
        public List<BaseProduct> Basket = new();
        public List<UserActivatedPromo> ActivatedPromo = new();
        public List<BalanceActionModel> BalanceActions = new();

    }
}
