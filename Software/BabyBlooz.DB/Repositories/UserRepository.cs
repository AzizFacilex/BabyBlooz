using BabyBlooz.DB.Entities;

namespace BabyBlooz.DB.Repositories {

    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(BabyBloozDbContext dbContext) : base(dbContext)
        {
        }
    }
}