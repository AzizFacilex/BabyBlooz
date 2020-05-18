using BabyBlooz.DB.Entities;

namespace BabyBlooz.DB.Repositories {

    public class LilypadUserRepository : BaseRepository<LilypadUser>, ILilypadUserRepository
    {
        public LilypadUserRepository(BabyBloozDbContext dbContext) : base(dbContext)
        {
        }
    }
}