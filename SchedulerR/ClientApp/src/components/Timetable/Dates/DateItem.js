import React, { useContext } from "react";

import TournamentContext from "../../../contexts/TournamentContext";
import Grid from "../../Grid/Grid";
import CourtList from "../Courts/CourtsList";
import TimeBar from "../../Grid/TimeBar";

const DateItem = (props) => {
  const context = useContext(TournamentContext);
  const date = context.tournament.playingDates.find((c) => c.id === props.id);

  return (
    <div className="date-container">
      <CourtList date={date} />
    </div>
  );
};

export default DateItem;
