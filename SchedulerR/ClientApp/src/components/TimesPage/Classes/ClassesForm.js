import React, { useState, useEffect } from "react";

import "./ClassesForm.css";

const ClassesForm = (props) => {
  let [duration, setDuration] = useState(props.selectedClass.MatchDuration);
  let [breakTime, setBreakTime] = useState(
    props.selectedClass.BreakBetweenMatches
  );

  useEffect(() => {
    setDuration(props.selectedClass.MatchDuration);
    setBreakTime(props.selectedClass.BreakBetweenMatches);
  });

  const onDurationInputChange = (e) => {
    setDuration(e.target.value);
    props.onDurationInputChange(e.target.value);
  };

  const onBreakInputChange = (e) => {
    setBreakTime(e.target.value);
    props.onBreakInputChange(e.target.value);
  };

  return (
    <form className="classes-times">
      <div className="form-group ">
        <label htmlFor="formGroupExampleInput">Match Duration (min)</label>
        <div className="input-box">
          <input
            type="text"
            className="form-control"
            id="matchDuration"
            onChange={onDurationInputChange}
            value={duration}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">
          Break Between Matches (min)
        </label>
        <input
          type="text"
          className="form-control"
          id="breakBetweenMatches"
          onChange={onBreakInputChange}
          value={breakTime}
        />
      </div>
    </form>
  );
};

export default ClassesForm;
