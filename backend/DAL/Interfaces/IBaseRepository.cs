namespace DAL.Interfaces
{
    public interface IBaseRepository<T>
    {
        Task Add(T entity);
        Task Update(T entity);
        Task Delete(T entity);
        Task DeleteRange(List<T> entityList);
        Task<IEnumerable<T>> GetAll();
        //List<T> GetAll();
    }
}
