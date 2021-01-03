import React, { useContext, useEffect } from "react";

import DatesList from "./Dates/DatesList";
import TournamentContext from "../../contexts/TournamentContext";

const TimetableContainer = () => {
  const context = useContext(TournamentContext);

  // useEffect(() => {
  //   let matchDurations = [];
  //   context.tournament.classes.forEach((classs) => {
  //     matchDurations.push(parseInt(classs.matchDuration));
  //   });

  //   const smallestMatchDuration = Math.min(...matchDurations);

  //   // number of 5min fields that covers the smallest match
  //   const smallestMatchDurationTimeFieldsCount = smallestMatchDuration / 5;

  //   //Initial Grid should be able to fill 12 matches with minimum duration
  //   //In 100vw it should fill 12 x "smallestMatchDurationTimeFieldsCount"
  //   const totalTimeFieldsPerVW = 12 * smallestMatchDurationTimeFieldsCount;
  //   // In 100vw we show always 5vw for the name of court and 95vw for 15 matches with smallest duration
  //   const timeFieldWidth = 95 / totalTimeFieldsPerVW;
  //   const slotWidthString = timeFieldWidth.toString() + "vw";
  //   context.setFieldWidth(timeFieldWidth);

  // }, []);

  if (context.fieldWidth != 0) {
    return (
      <div>
        <DatesList />
      </div>
    );
  } else return <></>;
};

export default TimetableContainer;
