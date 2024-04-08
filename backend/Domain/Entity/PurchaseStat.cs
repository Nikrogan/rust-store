using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class PurchaseStat
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public ulong ServerID {  get; set; }
        public string ProductName {  get; set; }
        public string ProductId { get; set; }
        public ulong PurchasesCount {  get; set; }

    }
}
