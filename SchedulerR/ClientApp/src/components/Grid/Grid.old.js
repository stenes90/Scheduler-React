import React, { useContext } from "react";
import * as moment from "moment";
import TournamentContext from "../../contexts/TournamentContext";

import "./Grid.css";
import CourtList from "../Timetable/Courts/CourtsList";

const Grid = (props) => {
  const context = useContext(TournamentContext);
  const date = context.tournament.PlayingDates.find((c) => c.Id === props.id);
  const startTime = new Date(date.StartTime);
  const endtTime = new Date(date.StartTime);
  endtTime.setDate(startTime.getDate() + 1);
  endtTime.setHours(0, 0, 0);
  //time between end of day and start time in minutes
  const timeInterval = (endtTime - startTime) / 60000;
  const timeslotsCountForTimeInterval = timeInterval / 5;

  const courts = date.Courts;

  let matchDurations = [];
  context.tournament.Classes.forEach((classs) => {
    matchDurations.push(parseInt(classs.MatchDuration));
  });

  const smallestMatchDuration = Math.min(...matchDurations);

  // number of 5min fields that covers the smallest match
  const smallestMatchDurationTimeFieldsCount = smallestMatchDuration / 5;

  //Initial Grid should be able to fill 12 matches with minimum duration
  //In 100vw it should fill 12 x "smallestMatchDurationTimeFieldsCount"
  const totalTimeFieldsPerVW = 12 * smallestMatchDurationTimeFieldsCount;
  // In 100vw we show always 5vw for the name of court and 95vw for 15 matches with smallest duration
  const timeFieldWidth = 95 / totalTimeFieldsPerVW;
  const slotWidthString = timeFieldWidth.toString() + "vw";

  let scrollerWidth = timeslotsCountForTimeInterval * timeFieldWidth;
  scrollerWidth = scrollerWidth.toString() + "vw";
  console.log(scrollerWidth);

  const timeSlots = [];

  //new Date(date.getTime() + minutes*60000);

  courts.forEach((court) => {
    let initialTime = new Date(date.StartTime);
    initialTime.setHours(0, 0, 0);
    for (let i = 0; i < 288; i++) {
      timeSlots.push({
        time: initialTime,
        index: i,
        dateId: date.Id,
        courtId: court.Id,
      });
      initialTime = new Date(initialTime.getTime() + 5 * 60000);
    }
  });
  console.log(timeSlots);

  const gridForCourt = (Id) => {
    const timeslotsForCourt = timeSlots.filter((c) => c.courtId === Id);
    const renderedTimeslots = timeslotsForCourt.map((slot) => {
      const displayed = slot.time < startTime ? "none" : "block";
      return (
        <div
          key={slot.index}
          style={{ display: displayed, width: slotWidthString }}
          className="timeslot"
          data-time={moment(slot.time).format()}
          data-index={slot.index}
          data-dateId={slot.dateId}
          data-courtId={slot.courtId}
        >
          {slot.index}
        </div>
      );
    });
    console.log(renderedTimeslots);
    return renderedTimeslots;
  };

  const renderedGrid = courts.map((court) => {
    return (
      <div className="court-container">
        <div
          className="row columns court-div"
          style={{ width: scrollerWidth, height: "10vh" }}
        >
          {gridForCourt(court.Id)}
        </div>
      </div>
    );
  });

  const courtNames = courts.map((c) => {
    return (
      <div className="court-name">
        <p>{c.Name}</p>
      </div>
    );
  });

  const dateGridHeight = (courts.length * 10 + 2).toString() + "vh";

  return (
    // <div id="date-grid">
    //   <div className="court-names">{courtNames}</div>
    //   <div
    //     className="container-fluid container-scroll"
    //     style={{ height: dateGridHeight, width: "95%" }}
    //   >
    //     {renderedGrid}
    //   </div>
    // </div>
    <CourtList date={date} />
  );
};

export default Grid;
