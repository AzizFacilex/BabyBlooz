using System;
using System.Collections.Generic;

namespace BabyBlooz.API.Models {
    public class UserDTO {
        public string Id { get; set; }
        public bool NotificationsEnabled { get; set; }
        public ushort ReportDataInterval { get; set; }
         public virtual ICollection<LilypadUser> LilypadUsers { get; set; }
    }
    public class LilypadUser
    {
        public string LilypadId { get; set; }
       
    }

}