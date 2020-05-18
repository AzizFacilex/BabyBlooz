using System.Threading.Tasks;
using BabyBlooz.DB.Repositories;
using AutoMapper;
using BabyBlooz.API.Models;

using BabyBlooz.DB.Entities;

using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace BabyBlooz.API.Services
{
    public class IDService : IIDService
    {
        private readonly IWrapperRepository repositories;
                            private readonly IMapper Mapper;

        public IDService (IWrapperRepository repositories, IMapper mapper) {

            this.repositories = repositories;
                        this.Mapper = mapper;

        }
        public async Task<bool> checkId (string id) {
            var temp = await this.repositories.Lilypads.FindById (id);
            return (temp == null) ? false : true;
        }
        public async Task<UserDTO> CreateOrUpdateUser(string id, string lilypadId)
        {
            if (await checkId(lilypadId))
            {
                if (string.IsNullOrEmpty(id)) //create new user
                {
                    User newUser = new User();
                    newUser.NotificationsEnabled = true;
                    newUser.ReportDataInterval = 30;
                    await this.repositories.Users.Create(newUser);
                    newUser.LilypadUsers = new List<BabyBlooz.DB.Entities.LilypadUser>() { new BabyBlooz.DB.Entities.LilypadUser() { LilypadId = lilypadId, UserId = newUser.Id } };
                    await this.repositories.Save();
                    var t = Mapper.Map<UserDTO> (newUser);
                        return t;

                }
                else
                {
                    var exUser = await this.repositories.Users.FindByCondition(x => x.Id == id).Include(x => x.LilypadUsers).SingleOrDefaultAsync();

                    if (exUser != null)
                    {
                        if (await this.repositories.LilypadUsers.FindByCondition(x => x.UserId == exUser.Id && x.LilypadId == lilypadId).SingleOrDefaultAsync() == null)
                        {
                            exUser.LilypadUsers.Add(new BabyBlooz.DB.Entities.LilypadUser() { LilypadId = lilypadId, UserId = id });
                            this.repositories.Users.Update(exUser);

                        }
                        await this.repositories.Save();
                        var t = Mapper.Map<UserDTO> (exUser);
                        return t;
                    }
                    else
                    {
                        return null;
                    }

                }
            }
            return null;
        }

    }
}