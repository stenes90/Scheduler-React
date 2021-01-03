using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerR.Dtos
{
    public class Tournament
    {
        public Tournament()
        {
            Classes = new List<Class>();
            Courts = new List<Court>();
            Matches = new List<Match>();
            PlayingDates = new List<PlayingDate>();
        }
        public int Id { get; set; }

        public List<Class> Classes { get; set; }
        public List<Court> Courts { get; set; }
        public List<Match> Matches { get; set; }
        public List<PlayingDate> PlayingDates { get; set; }

    }
}
