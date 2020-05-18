using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BabyBlooz.API.Hubs;
using Microsoft.AspNetCore.Mvc;
using BabyBlooz.API.Models;
using BabyBlooz.API.Services;
namespace BabyBlooz.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryService HistoryService;
        public HistoryController(IHistoryService historyService)
        {
            this.HistoryService = historyService;
        }
        [HttpGet]
        public async Task<HistoryDTO> Get([FromQuery]Dictionary<string, string> query)
        {
            var id = query["id"];
            var fromDate = query["start"];
            var toDate = query["end"];
            

            return await this.HistoryService.GetHistory(id, DateTime.Parse(fromDate), DateTime.Parse(toDate));
        }
    }
}
