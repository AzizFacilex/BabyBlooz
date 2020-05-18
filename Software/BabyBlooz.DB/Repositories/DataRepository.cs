using System;
using System.Collections.Generic;
using System.Linq;
using BabyBlooz.DB.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
namespace BabyBlooz.DB.Repositories
{

    public class DataRepository : BaseRepository<Data>, IDataRepository
    {
        BabyBloozDbContext dbContext;
        public DataRepository(BabyBloozDbContext dbContext) : base(dbContext)
        {
            this.dbContext = dbContext;
        }

        public IEnumerable<Data> GetHistoryData(DateTime startDate, DateTime endDate)
        {
         return null;
        }
    }
}