using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace BabyBlooz.API.Models
{
    public class LilyPadData
    {
        public string Id { get; set; }
        public DateTime RecordedAt { get; set; }

        public double Temperature { get; set; }
        [NotMapped]

        public Movement MovementXYZ { get; set; }
        public double Movement
        {
            get
            {
                return Math.Sqrt(Math.Pow(MovementXYZ.Xacceleration, 2) + Math.Pow(MovementXYZ.Yacceleration, 2) + Math.Pow(MovementXYZ.Zacceleration, 2));
            }
        }
        public double Heartbeat { get; set; }
        public double Sound { get; set; }
        public string LilypadId { get; set; }

        public object Lilypad { get; set; }

    }
    public class Movement
    {
        public double Xacceleration { get; set; }
        public double Yacceleration { get; set; }
        public double Zacceleration { get; set; }

    }
}