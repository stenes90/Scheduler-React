import React from "react";

import DateItem from "./DateItem";

const DatesList = (props) => {
  //console.log("dateList props");
  //console.log(props.onDateClick);

  const renderedlist = props.playingDates.map((date) => {
    let parsedDate = new Date(date.StartTime);
    // console.log(parsedDate);
    // console.log(parsedDate.getDay());
    // console.log(parsedDate.getDate());
    // console.log(parsedDate.getMonth());
    return (
      <DateItem
        id={date.Id}
        key={date.Id}
        date={parsedDate}
        selectedDateId={props.selectedDateId}
        onDateClick={props.onDateClick}
      />
    );
  });

  return <div className="dates-wrapper">{renderedlist}</div>;
};

export default DatesList;
