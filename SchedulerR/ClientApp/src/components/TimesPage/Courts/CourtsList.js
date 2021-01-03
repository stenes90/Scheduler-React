import React from "react";

import CourtItem from "./CourtItem";

const CourtList = (props) => {
  const renderedCourts = props.courts.map((court) => {
    return (
      <CourtItem
        court={court}
        key={court.Id}
        onCourtInputClick={props.onCourtInputClick}
      />
    );
  });

  return <div>{renderedCourts}</div>;
};

export default CourtList;
