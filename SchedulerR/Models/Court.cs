using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerR.Models
{
    public class Court
    {
        public Court()
        {
            Matches = new HashSet<Match>();
            PlayingDates = new HashSet<PlayingDate>();
        }
        public int Id { get; set; }

        public string Name { get; set; }

        public int TournamentId { get; set; }

        [ForeignKey("TournamentId")]
        public virtual Tournament Tournament { get; set; }

        public virtual ICollection<Match> Matches { get; set; }

        public virtual ICollection<PlayingDate> PlayingDates { get; set; }




        public Match LastScheduledMatch(List<Match> listOfMatches, Court court, DateTime date)
        {
            var matches = listOfMatches.Where(c => c.StartTime.Date == date).Where(d => d.Court.Id == court.Id).ToList();
            return matches.Last();
        }


    }
}
