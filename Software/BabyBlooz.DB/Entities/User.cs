using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace BabyBlooz.DB.Entities
{
    public class User : IEntity<User>
    {

        public string Id { get; set; }
        public bool NotificationsEnabled { get; set; }
        public ushort ReportDataInterval { get; set; }
        public virtual ICollection<LilypadUser> LilypadUsers { get; set; }


        public User AddErrors(object c) { return this; }
    }
}