using BabyBlooz.DB.Entities;

namespace BabyBlooz.DB.Repositories {

    public class WifiRepository : BaseRepository<Wifi>, IWifiRepository
    {
        public WifiRepository(BabyBloozDbContext dbContext) : base(dbContext)
        {
        }
    }
}