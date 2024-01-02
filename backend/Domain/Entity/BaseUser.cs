﻿using Domain.Enum;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class BaseUser
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string SteamId { get; set; }
        public string DisplayName { get; set; }
        public string AvatarUrl { get; set; }
        public decimal RuWallet { get; set; }
        public Role Role { get; set; } 
        
    }
}
