import React, { useContext } from "react";

import "./MatchItem.css";
import TournamentContext from "../../../contexts/TournamentContext";

const MatchItem = (props) => {
  const context = useContext(TournamentContext);

  const matchStartTime = new Date(props.match.startTime);
  const playingDateStartTime = new Date(props.date.startTime);
  const classes = context.tournament.classes;

  const timeFieldWidth = context.fieldWidth;
  let matchPositionLeft = (matchStartTime - playingDateStartTime) / 60000;
  matchPositionLeft =
    ((matchPositionLeft / 5) * timeFieldWidth).toString() + "vw";

  const matchWidth =
    ((parseInt(props.match.matchDuration) / 5) * timeFieldWidth).toString() +
    "vw";

  const colors = ["#034f84", "#c94c4c", "#50394c", "#b1cbbb", "#4040a1"];

  const color = () => {
    let col = "";
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].id == props.match.classId) {
        col = colors[i];
      }
    }
    return col;
  };

  const matchTimeString = () => {
    let date = new Date(props.match.startTime);
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    return hours + ":" + minutes;
  };

  return (
    <div
      className="match"
      style={{
        left: matchPositionLeft,
        width: matchWidth,
        backgroundColor: color(),
      }}
    >
      <p>time: {matchTimeString()}</p>
    </div>
  );
};

export default MatchItem;
