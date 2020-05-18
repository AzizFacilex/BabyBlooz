using System;
using System.Collections.Generic;
using BabyBlooz.DB.Entities;

namespace BabyBlooz.DB.Repositories {
    public interface IDataRepository:IBaseRepository<Data>{
        IEnumerable<Data> GetHistoryData(DateTime startDate, DateTime endDate);
    }

}