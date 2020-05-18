using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BabyBlooz.API.Models;
using BabyBlooz.DB.Repositories;
using BabyBlooz.DB.Entities;
using AutoMapper;
namespace BabyBlooz.API.Services
{
    public class DataService : IDataService
    {
        private readonly IWrapperRepository Repositories;
        private readonly IMapper Mapper;
        public DataService(IWrapperRepository repositories, IMapper mapper)
        {
            this.Repositories = repositories;
            this.Mapper = mapper;
        }
        public async Task PersistData(LilyPadData data)
        {
            data.RecordedAt = DateTime.Now;
            var dbData= Mapper.Map<Data>(data);
            await Repositories.Datas.Create(dbData);
            await Repositories.Save();



        }

    }
}