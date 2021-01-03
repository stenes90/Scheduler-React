using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerR.Dtos
{
    public class Class
    {
        public Class()
        {
            PlayingDates = new HashSet<PlayingDate>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int MatchDuration { get; set; }

        public int BreakBetweenMatches { get; set; }


        public virtual ICollection<PlayingDate> PlayingDates { get; set; }

    }
}
