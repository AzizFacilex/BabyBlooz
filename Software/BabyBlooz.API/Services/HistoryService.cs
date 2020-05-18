using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BabyBlooz.API.Models;
using BabyBlooz.DB.Repositories;
namespace BabyBlooz.API.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly IWrapperRepository Repositories;
        private readonly IMapper Mapper;
        public HistoryService(IWrapperRepository repositories, IMapper mapper)
        {
            this.Repositories = repositories;
            this.Mapper = mapper;
        }

        public async Task<HistoryDTO> GetHistory(string id, DateTime start, DateTime end)
        {

            var results = Repositories.Datas.FindByCondition(x => x.Lilypad.Id == id &&
               (DateTime.Compare(x.RecordedAt, start) >= 0) &&
               (DateTime.Compare(x.RecordedAt, end) <= 0)).ToList();
            var resultsGrouped = results.Select(x => x).OrderByDescending(x => x.Temperature).GroupBy(x => new { temp = x.RecordedAt.ToShortDateString() }).ToList();
            var historyDTO = new HistoryDTO();
            historyDTO.Temps=new List<TempMaxMin>();
            resultsGrouped.Select(x =>
            {
                var dayTemp = new TempMaxMin();
                dayTemp.TempMax = (x.Select(y => y.Temperature).FirstOrDefault());
                dayTemp.TempMin = (x.Select(y => y.Temperature).LastOrDefault());
                dayTemp.RecordedAt = (x.Select(y => y.RecordedAt).LastOrDefault());

                historyDTO.Temps.Add(dayTemp);
                return 0;
            }).ToList();
            historyDTO.Temps.Reverse();
            return historyDTO;
        }

    }

}