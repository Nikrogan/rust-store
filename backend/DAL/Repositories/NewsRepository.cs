using MongoDB.Bson;
using MongoDB.Driver;
using DAL.Interfaces;
using Domain.Entity;

namespace DAL.Repositories
{
    public class NewsRepository : IBaseRepository<BaseNews>
    {
        private readonly ApplicationDbContext _db;

        public NewsRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task Add(BaseNews entity)
        {
            await _db.NewsCollection.InsertOneAsync(entity);
        }

        public async Task Delete(BaseNews entity)
        {
            var filter = Builders<BaseNews>.Filter.Eq(u => u.Id, entity.Id);
            await _db.NewsCollection.DeleteOneAsync(filter);
        }

        public async Task DeleteRange(List<BaseNews> entityList)
        {
            var filter = Builders<BaseNews>.Filter.In(u => u.Id, entityList.Select(u => u.Id));
            await _db.NewsCollection.DeleteManyAsync(filter);
        }

        public List<BaseNews> GetAll()
        {
            return _db.NewsCollection.Find(new BsonDocument()).ToList();
        }

        public async Task Update(BaseNews entity)
        {
            var filter = Builders<BaseNews>.Filter.Eq(u => u.Id, entity.Id);
            await _db.NewsCollection.ReplaceOneAsync(filter, entity);
        }
    }
}
