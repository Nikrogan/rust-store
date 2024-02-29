using DAL.Interfaces;
using Domain.Entity;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DAL.Repositories;

public class ShopFiltersRepository : IBaseRepository<BaseShopFilter>
{
    private readonly ApplicationDbContext _db;

    public ShopFiltersRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task Add(BaseShopFilter entity)
    {
        await _db.ShopFiltersCollection.InsertOneAsync(entity);
    }

    public async Task Delete(BaseShopFilter entity)
    {
        var filter = Builders<BaseShopFilter>.Filter.Eq(u => u.Id, entity.Id);
        await _db.ShopFiltersCollection.DeleteOneAsync(filter);
    }

    public async Task DeleteRange(List<BaseShopFilter> entityList)
    {
        var filter = Builders<BaseShopFilter>.Filter.In(u => u.Id, entityList.Select(u => u.Id));
        await _db.ShopFiltersCollection.DeleteManyAsync(filter);
    }

    public async Task<IEnumerable<BaseShopFilter>> GetAll()
    {
        return await _db.ShopFiltersCollection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task Update(BaseShopFilter entity)
    {
        var filter = Builders<BaseShopFilter>.Filter.Eq(u => u.Id, entity.Id);
        await _db.ShopFiltersCollection.ReplaceOneAsync(filter, entity);
    }
}