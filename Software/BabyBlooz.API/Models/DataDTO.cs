using System;
namespace BabyBlooz.API.Models
{
    public class DataDTO
    {

        public DateTime RecordedAt { get; set; }
        public double Temperature { get; set; }
        public double Movement { get; set; }
        public double Heartbeat { get; set; }
        public double Sound { get; set; }

    }

}