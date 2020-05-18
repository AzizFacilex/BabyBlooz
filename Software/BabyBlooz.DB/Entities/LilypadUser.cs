using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace BabyBlooz.DB.Entities
{
    public class LilypadUser : IEntity<LilypadUser>
    {
        [NotMapped]
        public string Id { get; set; }
        public string LilypadId { get; set; }
        public Lilypad Lilypad { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public LilypadUser AddErrors(object c) { return this; }

    }
}