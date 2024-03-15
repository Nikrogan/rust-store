using DAL.Interfaces;
using Domain.Entity;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DAL.Repositories;

public class PlayerCheckSheetRepository : IBaseRepository<BasePlayerCheck>
{
    private readonly ApplicationDbContext _db;

    public PlayerCheckSheetRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<BasePlayerCheck>> GetAll()
    {
        return await _db.PlayerCheckSheetCollection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task Add(BasePlayerCheck entity)
    {
        await _db.PlayerCheckSheetCollection.InsertOneAsync(entity);
    }

    public async Task Delete(BasePlayerCheck entity)
    {
        var filter = Builders<BasePlayerCheck>.Filter.Eq(u => u.Id, entity.Id);
        await _db.PlayerCheckSheetCollection.DeleteOneAsync(filter);
    }

    public async Task DeleteRange(List<BasePlayerCheck> entityList)
    {
        var filter = Builders<BasePlayerCheck>.Filter.In(u => u.Id, entityList.Select(u => u.Id));
        await _db.PlayerCheckSheetCollection.DeleteManyAsync(filter);
    }

    public async Task Update(BasePlayerCheck entity)
    {
        var filter = Builders<BasePlayerCheck>.Filter.Eq(u => u.Id, entity.Id);
        await _db.PlayerCheckSheetCollection.ReplaceOneAsync(filter, entity);
    }
}