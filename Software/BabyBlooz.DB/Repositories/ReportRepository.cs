using BabyBlooz.DB.Entities;

namespace BabyBlooz.DB.Repositories {

    public class ReportRepository : BaseRepository<Report>, IReportRepository
    {
        public ReportRepository(BabyBloozDbContext dbContext) : base(dbContext)
        {
        }
    }
}