using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

public class ApplicationDbContext
{
    private readonly IMongoDatabase _database;
    
    public ApplicationDbContext(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("MongoDBConnection");
        var mongoClient = new MongoClient(connectionString);
        _database = mongoClient.GetDatabase("rust-store");
        //_userCollection = _database.GetCollection<User>("users");
    }

//    public IMongoCollection<User> _userCollection { get; set; }
}