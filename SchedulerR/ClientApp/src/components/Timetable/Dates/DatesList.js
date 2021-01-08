import React, { useContext, useEffect } from "react";
import TournamentContext from "../../../contexts/TournamentContext";
import DateItem from "./DateItem";
import Moment from "moment";
import { extendMoment } from "moment-range";

const DatesList = () => {
  const context = useContext(TournamentContext);
  const dates = context.tournament.playingDates;

  const renderedDates = dates.map((date) => {
    return <DateItem key={date.id} id={date.id} />;
  });

  return <div>{renderedDates}</div>;
};

export default DatesList;
