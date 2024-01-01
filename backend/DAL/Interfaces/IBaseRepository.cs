namespace RustStats.DAL.Interfaces
{
    public interface IBaseRepository<T>
    {
        Task Add(T entity);
        Task Update(T entity);
        Task Delete(T entity);
        Task DeleteRange(List<T> entityList);
        IQueryable<T> GetAll();
        //List<T> GetAll();
    }
}
