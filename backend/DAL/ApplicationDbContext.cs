using Domain.Entity;
using DotNetEnv;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace DAL;

public class ApplicationDbContext
{
    private readonly IMongoDatabase _database;

    public ApplicationDbContext(IConfiguration configuration)
    {
        Env.Load();
        var DbConnectionUrl = Environment.GetEnvironmentVariable("connectionDbString");

        if(string.IsNullOrEmpty(DbConnectionUrl))
        {
            Console.WriteLine("Failed to load connectionDbString from ENV");
            return;
        }    
        var connectionString = configuration.GetConnectionString(DbConnectionUrl);
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
        if (!CollectionExists("playerchecksheet"))
            _database.CreateCollection("playerchecksheet");
        if (!CollectionExists("serverсollection"))
            _database.CreateCollection("serverсollection");
        if (!CollectionExists("shopfilters"))
        {
            _database.CreateCollection("shopfilters");
            var defaultShopFilters = new List<BaseShopFilter>
            {
                new()
                {
                    Title = "Все товары"
                },
                new()
                {
                    Title = "Оружие"
                },

                new()
                {
                    Title = "Ресурсы"
                },

                new()
                {
                    Title = "Боеприпасы"
                },

                new()
                {
                    Title = "Одежда"
                },

                new()
                {
                    Title = "Конструкции"
                },

                new()
                {
                    Title = "Инструменты"
                }
            };
            _database.GetCollection<BaseShopFilter>("shopfilters").InsertMany(defaultShopFilters);
        }


        ServerCollection = _database.GetCollection<BaseServer>("servercollection");
        UserCollection = _database.GetCollection<BaseUser>("users");
        ProductCollection = _database.GetCollection<BaseProduct>("products");
        NewsCollection = _database.GetCollection<BaseNews>("news");
        PaymentCollection = _database.GetCollection<BasePayment>("payments");
        ShopFiltersCollection = _database.GetCollection<BaseShopFilter>("shopfilters");
        PlayerCheckSheetCollection = _database.GetCollection<BasePlayerCheck>("playerchecksheet");
        PromocodeCollection = _database.GetCollection<BasePromo>("promocodes");
    }

    public IMongoCollection<BaseUser> UserCollection { get; set; }
    public IMongoCollection<BaseProduct> ProductCollection { get; set; }
    public IMongoCollection<BaseNews> NewsCollection { get; set; }
    public IMongoCollection<BasePayment> PaymentCollection { get; set; }
    public IMongoCollection<BasePromo> PromocodeCollection { get; set; }
    public IMongoCollection<BaseShopFilter> ShopFiltersCollection { get; set; }
    public IMongoCollection<BaseServer> ServerCollection { get; set; }

    public IMongoCollection<BasePlayerCheck> PlayerCheckSheetCollection { get; set; }

    public bool CollectionExists(string collectionName)
    {
        var collections = _database.ListCollectionNames().ToList();
        return collections.Contains(collectionName);
    }
}