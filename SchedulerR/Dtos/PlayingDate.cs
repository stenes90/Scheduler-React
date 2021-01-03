using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerR.Dtos
{
    public class PlayingDate
    {
        public PlayingDate()
        {
            Courts = new List<Court>();
        }
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public List<Court> Courts { get; set; }
    }
}
