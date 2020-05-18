using BabyBlooz.DB.Entities;

namespace BabyBlooz.DB.Repositories {

    public class LilypadRepository : BaseRepository<Lilypad>, ILilypadRepository
    {
        public LilypadRepository(BabyBloozDbContext dbContext) : base(dbContext)
        {
        }
    }
}