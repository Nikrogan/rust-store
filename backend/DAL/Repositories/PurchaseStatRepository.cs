using MongoDB.Bson;
using MongoDB.Driver;
using DAL.Interfaces;
using Domain.Entity;

namespace DAL.Repositories
{
    public class PurchaseStatRepository : IBaseRepository<PurchaseStat>
    {
        private readonly ApplicationDbContext _db;

        public PurchaseStatRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task Add(PurchaseStat entity)
        {
            await _db.PurchasesStatCollection.InsertOneAsync(entity);
        }

        public async Task Delete(PurchaseStat entity)
        {
            var filter = Builders<PurchaseStat>.Filter.Eq(u => u.Id, entity.Id);
            await _db.PurchasesStatCollection.DeleteOneAsync(filter);
        }

        public async Task DeleteRange(List<PurchaseStat> entityList)
        {
            var filter = Builders<PurchaseStat>.Filter.In(u => u.Id, entityList.Select(u => u.Id));
            await _db.PurchasesStatCollection.DeleteManyAsync(filter);
        }

        public async Task<IEnumerable<PurchaseStat>> GetAll()
        {
            return await _db.PurchasesStatCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task Update(PurchaseStat entity)
        {
            var filter = Builders<PurchaseStat>.Filter.Eq(u => u.Id, entity.Id);
            await _db.PurchasesStatCollection.ReplaceOneAsync(filter, entity);
        }
    }
}
