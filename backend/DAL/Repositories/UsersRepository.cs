using MongoDB.Bson;
using MongoDB.Driver;
using DAL.Interfaces;
using Domain.Entity;

namespace DAL.Repositories
{
    public class UsersRepository : IBaseRepository<BaseUser>
    {
        private readonly ApplicationDbContext _db;

        public UsersRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task Add(BaseUser entity)
        {
            await _db.UserCollection.InsertOneAsync(entity);
        }

        public async Task Delete(BaseUser entity)
        {
            var filter = Builders<BaseUser>.Filter.Eq(u => u.Id, entity.Id);
            await _db.UserCollection.DeleteOneAsync(filter);
        }

        public async Task DeleteRange(List<BaseUser> entityList)
        {
            var filter = Builders<BaseUser>.Filter.In(u => u.Id, entityList.Select(u => u.Id));
            await _db.UserCollection.DeleteManyAsync(filter);
        }

        public List<BaseUser> GetAll()
        {
            return _db.UserCollection.Find(new BsonDocument()).ToList();
        }

        public async Task Update(BaseUser entity)
        {
            var filter = Builders<BaseUser>.Filter.Eq(u => u.Id, entity.Id);
            await _db.UserCollection.ReplaceOneAsync(filter, entity);
        }
    }
}
