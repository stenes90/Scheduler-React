import React, { useContext } from "react";

import TournamentContext from "../../../contexts/TournamentContext";
import CourtItem from "./CourtItem";
import TimeBar from "../../Grid/TimeBar";
import "./CourtsList.css";

const CourtList = (props) => {
  const courts = props.date.courts;
  const dateGridHeight = (courts.length * 10 + 4).toString() + "vh";

  const renderedCourts = courts.map((court) => {
    return <CourtItem key={court.id} court={court} date={props.date} />;
  });

  const courtNames = courts.map((c) => {
    return (
      <div className="court-name">
        <p>{c.name}</p>
      </div>
    );
  });

  return (
    <div className="courts-container">
      <div className="court-names">{courtNames}</div>
      <div
        className="container-fluid container-scroll"
        style={{ height: dateGridHeight, width: "95%" }}
      >
        <TimeBar date={props.date} />
        {renderedCourts}
      </div>
    </div>
  );
};

export default CourtList;
