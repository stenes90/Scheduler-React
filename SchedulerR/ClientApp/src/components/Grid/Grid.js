import React, { useContext } from "react";
import * as moment from "moment";
import TournamentContext from "../../contexts/TournamentContext";

import "./Grid.css";
import CourtList from "../Timetable/Courts/CourtsList";

const Grid = (props) => {
  const context = useContext(TournamentContext);
  const date = props.date;
  const startTime = new Date(date.startTime);
  const endtTime = new Date(date.startTime);
  endtTime.setDate(startTime.getDate() + 1);
  endtTime.setHours(0, 0, 0);
  //time between end of day and start time in minutes
  const timeInterval = (endtTime - startTime) / 60000;
  const timeslotsCountForTimeInterval = timeInterval / 5;

  const timeFieldWidth = context.fieldWidth;
  const slotWidthString = timeFieldWidth.toString() + "vw";

  let scrollerWidth = timeslotsCountForTimeInterval * timeFieldWidth;
  scrollerWidth = scrollerWidth.toString() + "vw";

  // const timeSlots = [];

  // let initialTime = new Date(date.startTime);
  // initialTime.setHours(0, 0, 0);
  // for (let i = 0; i < 288; i++) {
  //   timeSlots.push({
  //     time: initialTime,
  //     index: i,
  //     dateId: date.id,
  //     courtId: props.court.id,
  //   });
  //   initialTime = new Date(initialTime.getTime() + 5 * 60000);
  // }

  const timeSlots = context.timeFields
    .filter((c) => c.dateId == date.id)
    .filter((d) => d.courtId == props.court.id);
  const renderedTimeslots = timeSlots.map((slot) => {
    const displayed = slot.displayed == false ? "none" : "block";
    const zIndex = context.isMatchCoppied == true ? "10" : "0";
    return (
      <div
        className="timeslot"
        key={slot.id}
        slotId={slot.id}
        style={{ display: displayed, width: slotWidthString, zIndex: zIndex }}
        data-time={moment(slot.time).format()}
        data-index={slot.index}
        data-dateId={slot.dateId}
        data-courtId={slot.courtId}
      >
        {slot.id}
      </div>
    );
  });

  return (
    <div
      className="row columns timeslots-container"
      style={{ width: scrollerWidth, height: "10vh" }}
    >
      {renderedTimeslots}
    </div>
  );
};

export default Grid;
