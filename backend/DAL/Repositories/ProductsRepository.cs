using MongoDB.Bson;
using MongoDB.Driver;
using DAL.Interfaces;
using Domain.Entity;

namespace DAL.Repositories
{
    public class ProductsRepository : IBaseRepository<BaseProduct>
    {
        private readonly ApplicationDbContext _db;

        public ProductsRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task Add(BaseProduct entity)
        {
            await _db.ProductCollection.InsertOneAsync(entity);
        }

        public async Task Delete(BaseProduct entity)
        {
            var filter = Builders<BaseProduct>.Filter.Eq(u => u.Id, entity.Id);
            await _db.ProductCollection.DeleteOneAsync(filter);
        }

        public async Task DeleteRange(List<BaseProduct> entityList)
        {
            var filter = Builders<BaseProduct>.Filter.In(u => u.Id, entityList.Select(u => u.Id));
            await _db.ProductCollection.DeleteManyAsync(filter);
        }

        public async Task<IEnumerable<BaseProduct>> GetAll()
        {
            return await _db.ProductCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task Update(BaseProduct entity)
        {
            var filter = Builders<BaseProduct>.Filter.Eq(u => u.Id, entity.Id);
            await _db.ProductCollection.ReplaceOneAsync(filter, entity);
        }
    }
}
