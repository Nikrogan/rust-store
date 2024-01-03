using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Domain.Entity
{
    public class BaseNews
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int NewsId { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DateCreate { get; set; }
        public string Content { get; set; }
    }
}
