using System.Collections.Generic;
namespace BabyBlooz.DB.Entities
{
    public class Wifi : IEntity<Wifi>
    {
        public string Id { get; set; }
        public string SSID {get;set;}
        public string Password {get;set;}


        public Wifi AddErrors(object c) { return this; }
    }
}