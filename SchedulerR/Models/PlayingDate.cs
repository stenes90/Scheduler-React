using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerR.Models
{
    public class PlayingDate
    {
        public PlayingDate()
        {
            Courts = new HashSet<Court>();
            Matches = new List<Match>();
            Classes = new List<Class>();

        }
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public int TournamentId { get; set; }

        [ForeignKey("TournamentId")]
        public virtual Tournament Tournament { get; set; }

        public virtual ICollection<Court> Courts { get; set; }

        public virtual ICollection<Match> Matches { get; set; }

        public virtual ICollection<Class> Classes { get; set; }



        public Match LastScheduledMatch(List<Match> listOfMatches, DateTime date)
        {
            var matches = listOfMatches.Where(c => c.StartTime.Date == date).ToList();
            return matches.Last();
        }

        public Match lastMatchForClassFromPreviousRound(List<Match> listOfMatches, int actualRound)
        {
            var matches = listOfMatches.Where(c => c.Round == (actualRound - 1)).ToList();
            return matches.Last();
        }



    }
}
