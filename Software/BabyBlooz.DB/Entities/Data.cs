using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace BabyBlooz.DB.Entities {
    public class Data : IEntity<Data> {
        public string Id { get; set; }
        public DateTime RecordedAt { get; set; }



        public double Temperature { get; set; }
       
        public double Movement { get; set; }
        
        public double Heartbeat { get; set; }
       
        public double Sound { get; set; }
        
        public string LilypadId { get; set; }


        [ForeignKey ("LilypadId")]
        public Lilypad Lilypad { get; set; }

        public Data AddErrors (object c) {
            //TODO: Add error here
            return this;
        }
    }
    
}