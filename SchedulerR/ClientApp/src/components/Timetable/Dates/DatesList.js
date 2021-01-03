import React, { useContext, useEffect } from "react";
import TournamentContext from "../../../contexts/TournamentContext";
import DateItem from "./DateItem";
import Moment from "moment";
import { extendMoment } from "moment-range";

const DatesList = () => {
  const context = useContext(TournamentContext);
  const dates = context.tournament.playingDates;

  // useEffect(() => {
  //   let timeFieldElements = document.querySelectorAll(".timeslot");
  //   let timeFields = [];
  //   let fieldId = 0;
  //   timeFieldElements.forEach((item) => {
  //     let field = {
  //       id: fieldId,
  //       time: new Date(item.getAttribute("data-time")),
  //       index: item.getAttribute("data-index"),
  //       playingDateId: item.getAttribute("data-dateid"),
  //       courtId: item.getAttribute("data-courtid"),
  //       displayed: item.style.display == "block" ? true : false,
  //       empty: true,
  //     };
  //     fieldId++;
  //     timeFields.push(field);
  //   });
  //   const moment = extendMoment(Moment);
  //   const matches = context.tournament.matches;

  //   const matchTimeranges = [];
  //   const timeFieldTimeranges = [];

  //   //range1.intersect(range2);

  //   matches.forEach((item) => {
  //     const start = new Date(item.startTime);
  //     const end = new Date(start.getTime() + item.matchDuration * 60000);
  //     const range = moment.range(start, end);
  //     item.range = range;
  //     matchTimeranges.push(range);
  //   });

  //   timeFields.forEach((item) => {
  //     const start = item.time;
  //     const end = new Date(start.getTime() + 5 * 60000);
  //     const range = moment.range(start, end);
  //     item.range = range;
  //     timeFieldTimeranges.push(range);
  //   });

  //   timeFields.forEach((timeField) => {
  //     matchesLoop: for (let match of matches) {
  //       if (timeField.range.intersect(match.range)) {
  //         timeField.empty = false;
  //         break matchesLoop;
  //       }
  //     }
  //   });

  //   matches.forEach((match) => {
  //     timeFields
  //       .filter((c) => c.courtId == match.courtId)
  //       .filter((d) => d.playingDateId == match.playingDate.Id)
  //       .forEach((timeField) => {
  //         if (timeField.range.intersect(match.range)) {
  //           match.timeFields.push(timeField.id);
  //         }
  //       });
  //   });
  //   let tn = context.tournament;
  //   tn.matches = matches;
  //   context.setTimeFields(timeFields);
  //   context.setTournament(tn);
  // }, []);

  const renderedDates = dates.map((date) => {
    return <DateItem key={date.id} id={date.id} />;
  });

  return <div>{renderedDates}</div>;
};

export default DatesList;
