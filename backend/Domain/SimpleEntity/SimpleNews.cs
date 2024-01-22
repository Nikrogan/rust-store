using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
namespace Domain.SimpleEntity
{
    public class SimpleNews
    {
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string Content { get; set; }
    }
}
