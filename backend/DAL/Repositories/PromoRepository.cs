using MongoDB.Bson;
using MongoDB.Driver;
using DAL.Interfaces;
using Domain.Entity;

namespace DAL.Repositories
{
    public class PromoRepository : IBaseRepository<BasePromo>
    {
        private readonly ApplicationDbContext _db;

        public PromoRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task Add(BasePromo entity)
        {
            await _db.PromocodeCollection.InsertOneAsync(entity);
        }

        public async Task Delete(BasePromo entity)
        {
            var filter = Builders<BasePromo>.Filter.Eq(u => u.Id, entity.Id);
            await _db.PromocodeCollection.DeleteOneAsync(filter);
        }

        public async Task DeleteRange(List<BasePromo> entityList)
        {
            var filter = Builders<BasePromo>.Filter.In(u => u.Id, entityList.Select(u => u.Id));
            await _db.PromocodeCollection.DeleteManyAsync(filter);
        }

        public async Task<IEnumerable<BasePromo>> GetAll()
        {
            return await _db.PromocodeCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task Update(BasePromo entity)
        {
            var filter = Builders<BasePromo>.Filter.Eq(u => u.Id, entity.Id);
            await _db.PromocodeCollection.ReplaceOneAsync(filter, entity);
        }
    }
}
