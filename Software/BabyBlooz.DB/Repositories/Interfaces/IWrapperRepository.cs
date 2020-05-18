using System.Threading.Tasks;

namespace BabyBlooz.DB.Repositories {
    public interface IWrapperRepository{
        IDataRepository Datas {get;}
        ILilypadRepository Lilypads {get;}
        IReportRepository Reports {get;}
        IUserRepository Users {get;}
        IWifiRepository Wifis {get;}
        ILilypadUserRepository LilypadUsers {get;}
        Task Save();

    }
}