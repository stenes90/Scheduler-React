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
    timeFields: [],
    coppiedMatch: null,
    isMatchCoppied: false,
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
          isMatchCoppied: false,
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

  timeFields = (dates, matches) => {
    const timeSlots = [];
    const moment = extendMoment(Moment);
    let counter = 0;
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

  copyMatch = (id) => {
    let match = this.state.tournament.matches.find((c) => c.id == id);
    this.setState({
      isMatchCoppied: true,
      coppiedMatch: match,
    });
  };

  pasteMatch = (slotId) => {
    const moment = extendMoment(Moment);
    let coppiedMatch = this.state.coppiedMatch;
    const coppiedMatchFields = coppiedMatch.timeFields;
    const initialField = this.state.timeFields.find((f) => f.id == slotId);

    const startTime = new Date(initialField.time);
    const matchDuration = this.state.coppiedMatch.matchDuration;
    const endTime = new Date(
      initialField.time.getTime() + matchDuration * 60000
    );
    const range = moment.range(startTime, endTime);
    const date = this.state.tournament.playingDates.find(
      (d) => d.id == initialField.dateId
    );

    const courtId = initialField.courtId;
    let tn = this.state.tournament;
    let match = this.state.tournament.matches.find(
      (m) => m.id == this.state.coppiedMatch.id
    );
    match.startTime = startTime;
    match.endTime = endTime;
    match.playingDate = date;
    match.courtId = courtId;
    match.range = range;
    match.timeFields = [];
    const timeFields = this.state.timeFields;

    timeFields
      .filter((d) => d.dateId == match.playingDate.id)
      .filter((c) => c.courtId == match.courtId)
      .forEach((timeField) => {
        if (timeField.range.intersect(match.range)) {
          match.timeFields.push(timeField.id);
        }
      });

    coppiedMatchFields.forEach((item) => {
      let field = timeFields.find((c) => c.id == item);
      field.empty = true;
    });

    const matchesForCourt = this.state.tournament.matches.filter(
      (m) => m.courtId == initialField.courtId
    );

    const firstIntersectedMatch = this.firstIntersectedMatch(
      match,
      matchesForCourt
    );
    let movement = 0;
    if (firstIntersectedMatch) {
      movement = this.movement(firstIntersectedMatch, match);
    }
    if (firstIntersectedMatch) {
      for (let i = matchesForCourt.length - 1; i >= 0; i--) {
        let match = matchesForCourt[i];
        if (match.id == this.state.coppiedMatch.id) {
          continue;
        }
        let emptyFields = timeFields
          .filter((d) => d.dateId == match.playingDate.id)
          .filter((c) => c.courtId == match.courtId)
          .filter((e) => e.empty == true)
          .filter((f) => f.id < match.timeFields[0])
          .filter(
            (g) =>
              g.id >
              firstIntersectedMatch.timeFields[
                firstIntersectedMatch.timeFields.length - 1
              ]
          );
        if (
          emptyFields.length < movement &&
          match.timeFields[0] >= firstIntersectedMatch.timeFields[0]
        ) {
          let moveFields = movement - emptyFields.length;
          let moveMinutes = (movement - emptyFields.length) * 5;
          let startTime = new Date(match.startTime);
          startTime = new Date(startTime.getTime() + moveMinutes * 60000);
          let endTime = new Date(match.endTime);
          endTime = new Date(endTime.getTime() + moveMinutes * 60000);
          const range = moment.range(startTime, endTime);
          match.startTime = startTime;
          match.endTime = endTime;
          match.range = range;
        }
      }
    }

    matchesForCourt.forEach((match) => {
      match.timeFields = [];
      timeFields
        .filter((d) => d.dateId == match.playingDate.id)
        .filter((c) => c.courtId == match.courtId)
        .forEach((timeField) => {
          if (timeField.range.intersect(match.range)) {
            match.timeFields.push(timeField.id);
          }
        });
    });

    const busyTimeFields = [];
    matchesForCourt.forEach((match) => {
      busyTimeFields.push(...match.timeFields);
    });

    const timeFieldsForCourt = timeFields
      .filter((c) => c.courtId == coppiedMatch.courtId)
      .filter((d) => d.dateId == coppiedMatch.playingDate.id);
    for (let field of timeFieldsForCourt) {
      if (busyTimeFields.includes(field.id)) {
        field.empty = false;
      } else {
        field.empty = true;
      }
    }

    console.log(timeFields);

    this.setState({
      tournament: tn,
      isMatchCoppied: false,
      coppiedMatch: null,
    });
  };

  firstIntersectedMatch = (coppiedMatch, matchesForCourt) => {
    let intersectedMatches = [];
    let firstIntersectedMatch = null;
    for (let match of matchesForCourt) {
      if (match.id == coppiedMatch.id) {
        continue;
      }
      if (match.range.intersect(coppiedMatch.range)) {
        intersectedMatches.push(match);
      }
    }
    //timefields for intersected matches
    let timefields = [];
    for (let item of intersectedMatches) {
      for (let field of item.timeFields) {
        timefields.push(field);
      }
    }

    if (timefields.length > 0) {
      const smallestTimeField = Math.min(...timefields);
      firstIntersectedMatch = intersectedMatches.find((t) =>
        t.timeFields.includes(smallestTimeField)
      );
    }
    return firstIntersectedMatch;
  };

  movement = (intersectedMatch, coppiedMatch) => {
    let movement = 0;
    const matchTimeFieldsCount = intersectedMatch.timeFields.length;
    if (coppiedMatch.timeFields[0] < intersectedMatch.timeFields[0]) {
      movement =
        coppiedMatch.timeFields[coppiedMatch.timeFields.length - 1] -
        intersectedMatch.timeFields[0] +
        1;
    } else if (coppiedMatch.timeFields[0] == intersectedMatch.timeFields[0]) {
      movement = coppiedMatch.timeFields.length;
    } else {
      movement =
        coppiedMatch.timeFields[coppiedMatch.timeFields.length - 1] -
        intersectedMatch.timeFields[intersectedMatch.timeFields.length - 1] +
        intersectedMatch.timeFields.length;
    }
    return movement;
  };

  setTournament = (tn) => {
    this.setState({ tournament: tn });
  };

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
            <TimetableContainer
              copyMatch={this.copyMatch}
              pasteMatch={this.pasteMatch}
            />
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
