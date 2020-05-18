using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BabyBlooz.API.Models;
namespace BabyBlooz.API.Services
{
    public interface IHistoryService
    {
        Task<HistoryDTO> GetHistory (string id, DateTime start, DateTime end);


    }

}