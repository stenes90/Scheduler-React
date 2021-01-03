using Itenso.TimePeriod;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerR.Dtos
{
    public class Match
    {
        
        public int Id { get; set; }

        public int ClassId { get; set; }
        public int? CourtId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsScheduled { get; set; }
        public int MatchDuration { get; set; }
        public int Round { get; set; }
        public PlayingDate PlayingDate { get; set; }

        public TimeRange Timerange { get; set; }

        public int matchScheduleIndex { get; set; }


    }
}
