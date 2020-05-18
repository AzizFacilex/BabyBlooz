using BabyBlooz.DB.Repositories;
using Microsoft.Extensions.DependencyInjection;
namespace BabyBlooz.DB {
    public static class ConfigureDB {
        static public void AddDBServices (this IServiceCollection services) {
            services.AddDbContext<BabyBloozDbContext> ();
            services.AddTransient<IWrapperRepository, WrapperRepository> ();

        }
    }

}