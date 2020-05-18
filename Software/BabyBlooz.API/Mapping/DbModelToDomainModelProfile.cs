using AutoMapper;
using BabyBlooz.DB.Entities;
using BabyBlooz.API;
namespace BabyBlooz.API.Mapping
{
    public class DbModelToDomainModelProfile : Profile
    {
        public void CreateMaps()
        {
            CreateMap<Data, Models.DataDTO>();
            CreateMap<Models.LilyPadData, Data>();

        }

    }

}