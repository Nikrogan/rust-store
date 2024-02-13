using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enum;

namespace Domain.Entity
{
    public class BasePayment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? CustomOrderId { get; set; }
        public string? ServiceOrderId { get; set; }

        public string SteamId { get; set; }
        public int PaymentId { get; set; }
        public decimal Amount { get; set; }
        public DateTime? DateTime { get; set; }
        public PaymentMethods? PaymentMethod { get; set; }
        public PaymentStatus? PaymentStatus { get; set; }
    }
}
