import React, { useContext } from "react";

import TournamentContext from "../../contexts/TournamentContext";
import "./TimeBar.css";

const TimeBar = (props) => {
  const context = useContext(TournamentContext);
  const date = props.date;
  const startTime = new Date(date.startTime);
  const endtTime = new Date(date.startTime);
  endtTime.setDate(startTime.getDate() + 1);
  endtTime.setHours(0, 0, 0);
  //time between end of day and start time in minutes
  const timeInterval = (endtTime - startTime) / 60000;
  const timeBarStampsCount = timeInterval / 30;
  const timeFieldWidth = context.fieldWidth;
  const timeBarStampWidth = 6 * timeFieldWidth;
  const timeBarStampWidthString = timeBarStampWidth.toString() + "vw";
  const timeBarWidth =
    (timeBarStampsCount * timeBarStampWidth).toString() + "vw";

  let time = startTime;

  //initialTime = new Date(initialTime.getTime() + 5 * 60000);
  const renderedTimeBar = [];
  for (let i = 0; i < timeBarStampsCount; i++) {
    const timeStamp = (
      <div
        style={{ width: timeBarStampWidthString }}
        className="time-bar-stamp"
      >
        {time.getHours() + ":" + time.getMinutes()}
      </div>
    );
    time = new Date(time.getTime() + 30 * 60000);
    renderedTimeBar.push(timeStamp);
  }

  return (
    <div style={{ width: timeBarWidth }} className="time-bar">
      {renderedTimeBar}
    </div>
  );
};

export default TimeBar;
