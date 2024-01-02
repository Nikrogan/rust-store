using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Domain.Entity;

namespace DAL
{
    public class ApplicationDbContext
    {
        private readonly IMongoDatabase _database;

        public ApplicationDbContext(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("MongoDBConnection");
            var mongoClient = new MongoClient(connectionString);
            _database = mongoClient.GetDatabase("rust-store");
            UserCollection = _database.GetCollection<BaseUser>("users");
        }

        public IMongoCollection<BaseUser> UserCollection { get; set; }
    }
}