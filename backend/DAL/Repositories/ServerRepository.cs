using DAL.Interfaces;
using Domain.Entity;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DAL.Repositories;

public class ServerRepository : IBaseRepository<BaseServer>
{
    private readonly ApplicationDbContext _db;

    public ServerRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<BaseServer>> GetAll()
    {
        return await _db.ServerCollection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task Add(BaseServer entity)
    {
        await _db.ServerCollection.InsertOneAsync(entity);
    }

    public async Task Delete(BaseServer entity)
    {
        var filter = Builders<BaseServer>.Filter.Eq(u => u.Id, entity.Id);
        await _db.ServerCollection.DeleteOneAsync(filter);
    }

    public async Task DeleteRange(List<BaseServer> entityList)
    {
        var filter = Builders<BaseServer>.Filter.In(u => u.Id, entityList.Select(u => u.Id));
        await _db.ServerCollection.DeleteManyAsync(filter);
    }

    public async Task Update(BaseServer entity)
    {
        var filter = Builders<BaseServer>.Filter.Eq(u => u.Id, entity.Id);
        await _db.ServerCollection.ReplaceOneAsync(filter, entity);
    }
}