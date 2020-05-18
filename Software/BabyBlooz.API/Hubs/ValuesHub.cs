using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
namespace BabyBlooz.API.Hubs {
    public class ValuesHub : Hub<IValuesClient> {

        /// <summary>
        /// Notify all users that a value has been added.
        /// </summary>
        /// <param name="value">The added value</param>
        public async Task Add (string value) => await Clients.All.Add (value);
    }
}
/*
to configure the wifi on lilypad we can do the following
set the lilypad to try connecting to nearest open wifi (Can be android mobile hotspot)
when connected the app sends all saved wifis to the api,
the api sends it back to the lilypad.
the lilypad will be configured, and any further configuration can be made over API
 */