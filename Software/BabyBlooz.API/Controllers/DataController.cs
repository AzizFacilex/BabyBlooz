using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BabyBlooz.API.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using BabyBlooz.API.Models;
using BabyBlooz.API.Services;
namespace BabyBlooz.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IDataService DataService;
                private IHubContext<ValuesHub> Context;

        public DataController(IDataService dataService,IHubContext<ValuesHub> context)
        {
            this.DataService = dataService;
            this.Context = context;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]LilyPadData data)
        {
            

            await this.DataService.PersistData(data);
            await Context.Clients.All.SendAsync(data.LilypadId,data);
            return new OkObjectResult(data);
        }

    }
}
