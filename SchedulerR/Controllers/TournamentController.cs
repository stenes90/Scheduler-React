using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchedulerR.Data;
using SchedulerR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerR.Controllers
{
    public class TournamentController : Controller
    {
        private ApplicationDbContext _context;
        public TournamentController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        
        public JsonResult ScheduleMatches([FromBody] Dtos.Tournament tn)
        {
            //var tn = new Tournament();
            //tn.Classes = govnece.Classes;
            //tn.Courts = govnece.Courts;
            //tn.EndDate = govnece.EndDate;
            //tn.Matches = govnece.Matches;
            //tn.PlayingDates = govnece.PlayingDates;
            //tn.StartDate = govnece.StartDate;
            //_context.Tournaments.Add(tn);
            //_context.SaveChanges();
            var scheduledTn = Schedule.ScheduleMatches(tn);


            //var serJson = JsonConvert.SerializeObject(scheduledTn, new JsonSerializerSettings()
            //{
            //    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            //});
            var serJson = JsonConvert.SerializeObject(scheduledTn);
            var check = Json(scheduledTn);
            return Json(scheduledTn);
            


        }
    }
}
