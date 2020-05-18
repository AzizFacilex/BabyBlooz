using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace BabyBlooz.DB.Entities
{
    public class Lilypad : IEntity<Lilypad>
    {
        public string Id { get; set; }
        
        public string QRCode{get;set;}
        public virtual ICollection<LilypadUser> LilypadUsers{get;set;}
        public virtual ICollection<Wifi> Wifis {get;set;}
        public Lilypad AddErrors (object c) {
            //TODO: Add error here
            return this;
        }
    }

}