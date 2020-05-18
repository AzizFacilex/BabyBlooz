using System.Threading.Tasks;
using BabyBlooz.DB;

namespace BabyBlooz.DB.Repositories
{
    public class WrapperRepository : IWrapperRepository
    {
        public WrapperRepository(BabyBloozDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        private readonly BabyBloozDbContext dbContext;

        private IDataRepository DataRepo;
        public IDataRepository Datas
        {
            get
            {
                if (DataRepo != null)
                    return this.Datas;
                return new DataRepository(dbContext);
            }
        }
    
        private ILilypadRepository LilypadRepo;
        public ILilypadRepository Lilypads
        {
            get
            {
                if (LilypadRepo != null)
                    return this.Lilypads;
                return new LilypadRepository(dbContext);
            }
        }
        private IReportRepository ReportRepo;
        public IReportRepository Reports
        {
            get
            {
                if (ReportRepo != null)
                    return this.Reports;
                return new ReportRepository(dbContext);
            }
        }
        private IUserRepository UserRepo;
        public IUserRepository Users
        {
            get
            {
                if (UserRepo != null)
                    return this.Users;
                return new UserRepository(dbContext);
            }
        }
        private IWifiRepository WifiRepo;
        public IWifiRepository Wifis
        {
            get
            {
                if (WifiRepo != null)
                    return this.Wifis;
                return new WifiRepository(dbContext);
            }
        }
        private ILilypadUserRepository LilypadUserRepo;
        public ILilypadUserRepository LilypadUsers
        {
            get
            {
                if (LilypadRepo != null)
                    return this.LilypadUsers;
                return new LilypadUserRepository(dbContext);
            }
        }
        public async Task Save()
        {
            await this.dbContext.SaveChangesAsync();

        }

    }
}