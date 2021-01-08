import React, { useContext, useEffect } from "react";

import DatesList from "./Dates/DatesList";
import TournamentContext from "../../contexts/TournamentContext";
import ContextMenu from "../ContextMenu/Contextmenu";

const TimetableContainer = (props) => {
  //const context = useContext(TournamentContext);

  //if (context.fieldWidth != 0) {
  return (
    <div>
      <DatesList />
      <ContextMenu copyMatch={props.copyMatch} pasteMatch={props.pasteMatch} />
    </div>
  );
  //} else return <></>;
};

export default TimetableContainer;
