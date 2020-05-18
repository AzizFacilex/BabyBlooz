using System;
using System.Collections.Generic;

namespace BabyBlooz.API.Models
{
    public class HistoryDTO
    {
        public List<TempMaxMin> Temps{get;set;}
        
    }
    public class TempMaxMin{
        public double TempMax{get;set;}
        public double TempMin{get;set;}
        public DateTime RecordedAt{get;set;}

    }
}
