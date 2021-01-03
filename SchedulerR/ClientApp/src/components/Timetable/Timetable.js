import React from "react";

import Tournament from "../../TournamentUpdated.json";
import TimetableContainer from "./TimetableContainer";
import TournamentContext from "../../contexts/TournamentContext";
import Moment from "moment";
import { extendMoment } from "moment-range";

class Timetable extends React.Component {
  state = {
    scheduled: false,
    tournament: Tournament.data,
    fieldWidth: 0,
    timeFields: null,
  };

  logIt = () => {
    console.log(this.state.tournament);
  };

  onScheduleMatchesClick = async () => {
    let op = Tournament;
    const response = await fetch(
      "https://localhost:44366/Tournament/ScheduleMatches",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id: Tournament.Id,
          StartDate: Tournament.StartDate,
          EndDate: Tournament.EndDate,
          Courts: Tournament.Courts,
          PlayingDates: Tournament.PlayingDates,
          Matches: Tournament.Matches,
          Classes: Tournament.Classes,
        }),
      }
    )
      .then((result) => {
        console.log(result);
        return result.json();
      })
      .then((data) => {
        //console.log(JSON.parse(data));
        console.log(data);
        //const tn = JSON.parse(data);
        const tn = data;
        const matchTimeranges = [];
        const moment = extendMoment(Moment);
        let matches = tn.matches;
        matches.forEach((match) => {
          match.timeFields = [];
          const start = new Date(match.startTime);
          const end = new Date(start.getTime() + match.matchDuration * 60000);
          const range = moment.range(start, end);
          match.range = range;
          matchTimeranges.push(range);
        });
        const timeFieldWidth = this.timeSlotWidth(tn.classes);
        const timeFields = this.timeFields(tn.playingDates, matches);

        matches.forEach((match) => {
          timeFields
            .filter((d) => d.playingDateId == match.playingDate.Id)
            .filter((c) => c.courtId == match.courtId)
            .forEach((timeField) => {
              if (timeField.range.intersect(match.range)) {
                match.timeFields.push(timeField.id);
              }
            });
        });

        this.setState({
          tournament: tn,
          scheduled: true,
          fieldWidth: timeFieldWidth,
          setTournament: this.setTournament,
          timeFields: timeFields,
        });
      });
  };

  timeSlotWidth = (classes) => {
    // CALCULATING TIMEFIELD WIDTH START
    let matchDurations = [];
    classes.forEach((classs) => {
      matchDurations.push(parseInt(classs.matchDuration));
    });
    const smallestMatchDuration = Math.min(...matchDurations);
    // number of 5min fields that covers the smallest match
    const smallestMatchDurationTimeFieldsCount = smallestMatchDuration / 5;
    //Initial Grid should be able to fill 12 matches with minimum duration
    //In 100vw it should fill 12 x "smallestMatchDurationTimeFieldsCount"
    const totalTimeFieldsPerVW = 12 * smallestMatchDurationTimeFieldsCount;
    // In 100vw we show always 5vw for the name of court and 95vw for 15 matches with smallest duration
    const timeFieldWidth = 95 / totalTimeFieldsPerVW;
    // CALCULATING TIMEFIELD WIDTH END
    return timeFieldWidth;
  };

  // timeFields.forEach((item) => {
  //   const start = item.time;
  //   const end = new Date(start.getTime() + 5 * 60000);
  //   const range = moment.range(start, end);
  //   item.range = range;
  //   timeFieldTimeranges.push(range);
  // });

  timeFields = (dates, matches) => {
    const timeSlots = [];
    const moment = extendMoment(Moment);
    let counter = 1;
    dates.forEach((date) => {
      const dateCourts = date.courts;
      dateCourts.forEach((court) => {
        const startTime = new Date(date.startTime);
        const endtTime = new Date(date.startTime);
        endtTime.setDate(startTime.getDate() + 1);
        endtTime.setHours(0, 0, 0);

        let initialTime = new Date(date.startTime);
        initialTime.setHours(0, 0, 0);
        for (let i = 0; i < 288; i++) {
          const start = initialTime;
          const end = new Date(start.getTime() + 5 * 60000);
          const range = moment.range(start, end);
          const displayed = start < startTime ? false : true;
          let empty = true;
          matchesLoop: for (let match of matches) {
            if (range.intersect(match.range)) {
              empty = false;
              break matchesLoop;
            }
          }

          timeSlots.push({
            id: counter,
            time: initialTime,
            index: i,
            dateId: date.id,
            courtId: court.id,
            range: range,
            displayed: displayed,
            empty: empty,
          });
          initialTime = new Date(initialTime.getTime() + 5 * 60000);
          counter++;
        }
      });
    });
    return timeSlots;
  };

  // setTournament = (tn) => {
  //   this.setState({ tournament: tn });
  // };

  // setFieldWidth = (vwValue) => {
  //   this.setState({ fieldWidth: vwValue });
  // };

  // setTimeFields = (fields) => {
  //   this.setState({ timeFields: fields });
  // };

  render() {
    console.log("timetable component loaded");
    console.log(this.state);
    const renderTimetable = () => {
      if (this.state.scheduled) {
        return (
          <TournamentContext.Provider value={this.state}>
            <TimetableContainer />
          </TournamentContext.Provider>
        );
      }
    };

    return (
      <div>
        <button onClick={this.onScheduleMatchesClick}>Schedule Matches</button>
        {renderTimetable()}
      </div>
    );
  }
}

export default Timetable;
