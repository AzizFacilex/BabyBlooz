using System.Threading.Tasks;
using BabyBlooz.API.Models;
namespace BabyBlooz.API.Services{
    public interface IIDService
    {
        Task<UserDTO> CreateOrUpdateUser(string id, string lilypadId);
         Task<bool> checkId(string id);
    }
}