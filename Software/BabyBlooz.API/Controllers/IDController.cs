using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BabyBlooz.API.Hubs;
using Microsoft.AspNetCore.Mvc;
using BabyBlooz.API.Services;
using Microsoft.AspNetCore.SignalR;
using BabyBlooz.DB.Entities;
using BabyBlooz.API.Models;

namespace BabyBlooz.API.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class IdController : ControllerBase {
        private readonly IIDService iDService;
        public IdController(IIDService iDService){
            this.iDService=iDService;
        }
        [HttpGet]
        public async Task<UserDTO> Get ([FromQuery] string lilypadId, string id=null) {

            var t =  await iDService.CreateOrUpdateUser(id,lilypadId);
            return  t;

        }
    }
}
