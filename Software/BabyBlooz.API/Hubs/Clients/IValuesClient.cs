using System.Threading.Tasks;
namespace BabyBlooz.API.Hubs {
    public interface IValuesClient {
        /// <summary>
        /// This will notify all linked clients that values have been received from lilypad
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        Task Add (string value);
    }
}