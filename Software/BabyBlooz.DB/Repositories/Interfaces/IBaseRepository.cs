using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BabyBlooz.DB.Entities;
namespace BabyBlooz.DB.Repositories {
    public interface IBaseRepository<T> where T:class,IEntity<T>{

        IQueryable<T> FindAll ();
        Task<T> FindById(string Id);
        IQueryable<T> FindByCondition (Expression<Func<T, bool>> expression);
        Task Create (T entity);
        void Update (T entity);
        void Delete (T entity);
        void SetEntityState(T entity, EntityState state);
    }
}