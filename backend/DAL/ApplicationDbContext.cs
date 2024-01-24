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
            Console.WriteLine(connectionString);
            var mongoClient = new MongoClient(connectionString);
            _database = mongoClient.GetDatabase("rust-store");

            // Проверка на базовые коллекции
            if (!CollectionExists("users"))
                _database.CreateCollection("users");
            if (!CollectionExists("products"))
                _database.CreateCollection("products");
            if (!CollectionExists("news"))
                _database.CreateCollection("news");
            if (!CollectionExists("payments"))
                _database.CreateCollection("payments");
            if (!CollectionExists("promocodes"))
                _database.CreateCollection("promocodes");

            UserCollection = _database.GetCollection<BaseUser>("users");
            ProductCollection = _database.GetCollection<BaseProduct>("products");
            NewsCollection = _database.GetCollection<BaseNews>("news");
            PaymentCollection = _database.GetCollection<BasePayment>("payments");
            PromocodeCollection = _database.GetCollection<BasePromo>("promocodes");
        }

        public IMongoCollection<BaseUser> UserCollection { get; set; }
        public IMongoCollection<BaseProduct> ProductCollection { get; set; }
        public IMongoCollection<BaseNews> NewsCollection { get; set; }
        public IMongoCollection<BasePayment> PaymentCollection { get; set; }
        public IMongoCollection<BasePromo> PromocodeCollection { get; set; }

        public bool CollectionExists(string collectionName)
        {
            var collections = _database.ListCollectionNames().ToList();
            return collections.Contains(collectionName);
        }
    }
}