using System.Collections.Generic;
namespace BabyBlooz.DB.Entities
{
    public class Report : IEntity<Report>
    {
        public string Id { get; set; }
        public string TemperatureMSG { get; set; }
        public string MovementMSG { get; set; }
        public string HeartbeatMSG { get; set; }
        public string SoundMSG { get; set; }
        public ICollection<Data> Data {get;set;}



        public Report AddErrors(object c) { return this; }
    }
}