import React, { useContext } from "react";

import TournamentContext from "../../../contexts/TournamentContext";
import Grid from "../../Grid/Grid";
import MatchesList from "../Matches/MatchesList";
import "./CourtItem.css";

const CourtItem = (props) => {
  const context = useContext(TournamentContext);
  //const matches = props.court.matches;
  let matc = context.tournament.matches;

  const matches = context.tournament.matches.filter(
    (c) => c.courtId == props.court.id && c.playingDate.id == props.date.id
  );
  return (
    <div className="court-item">
      <Grid court={props.court} date={props.date} />
      <MatchesList matches={matches} date={props.date} />
    </div>
  );
};

export default CourtItem;
