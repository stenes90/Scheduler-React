import React from "react";

import TournamentContext from "../../../contexts/TournamentContext";
import MatchItem from "./MatchItem";

const MatchesList = (props) => {
  const renderedMatches = props.matches.map((match) => {
    return <MatchItem key={match.id} date={props.date} match={match} />;
  });
  return <div className="court-matches-container">{renderedMatches}</div>;
};

export default MatchesList;
