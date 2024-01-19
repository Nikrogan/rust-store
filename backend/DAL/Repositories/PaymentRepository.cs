using MongoDB.Bson;
using MongoDB.Driver;
using DAL.Interfaces;
using Domain.Entity;

namespace DAL.Repositories
{
    public class PaymentRepository : IBaseRepository<BasePayment>
    {
        private readonly ApplicationDbContext _db;

        public PaymentRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task Add(BasePayment entity)
        {
            await _db.PaymentCollection.InsertOneAsync(entity);
        }

        public async Task Delete(BasePayment entity)
        {
            var filter = Builders<BasePayment>.Filter.Eq(u => u.Id, entity.Id);
            await _db.PaymentCollection.DeleteOneAsync(filter);
        }

        public async Task DeleteRange(List<BasePayment> entityList)
        {
            var filter = Builders<BasePayment>.Filter.In(u => u.Id, entityList.Select(u => u.Id));
            await _db.PaymentCollection.DeleteManyAsync(filter);
        }

        public async Task<IEnumerable<BasePayment>> GetAll()
        {
            return await _db.PaymentCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task Update(BasePayment entity)
        {
            var filter = Builders<BasePayment>.Filter.Eq(u => u.Id, entity.Id);
            await _db.PaymentCollection.ReplaceOneAsync(filter, entity);
        }
    }
}
