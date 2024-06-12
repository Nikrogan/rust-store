using DAL.Interfaces;
using Domain.Entity;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DAL.Repositories
{
    public class BansRepository : IBaseRepository<BaseBan>
    {
        private readonly ApplicationDbContext _db;

        public BansRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task Add(BaseBan entity)
        {
            await _db.BansCollection.InsertOneAsync(entity);
        }

        public async Task Delete(BaseBan entity)
        {
            var filter = Builders<BaseBan>.Filter.Eq(u => u.Id, entity.Id);
            await _db.BansCollection.DeleteOneAsync(filter);
        }

        public async Task DeleteRange(List<BaseBan> entityList)
        {
            var filter = Builders<BaseBan>.Filter.In(u => u.Id, entityList.Select(u => u.Id));
            await _db.BansCollection.DeleteManyAsync(filter);
        }

        public async Task<IEnumerable<BaseBan>> GetAll()
        {
            return await _db.BansCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task Update(BaseBan entity)
        {
            var filter = Builders<BaseBan>.Filter.Eq(u => u.Id, entity.Id);
            await _db.BansCollection.ReplaceOneAsync(filter, entity);
        }
    }
}
