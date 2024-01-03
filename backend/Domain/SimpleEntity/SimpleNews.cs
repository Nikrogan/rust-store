using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
namespace Domain.SimpleEntity
{
    public class SimpleNews
    {
        public int NewsId { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DateCreate { get; set; }
    }
}
