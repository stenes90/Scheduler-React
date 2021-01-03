import React from "react";

const CourtItem = (props) => {
  const onCourtClick = () => {
    props.onCourtInputClick(props.court.Id);
  };

  const classId = `inlineCheckbox${props.court.Id}`;

  return (
    <div className="form-check form-check-inline">
      <input
        checked={props.court.checked === true ? true : false}
        onClick={onCourtClick}
        className="form-check-input"
        type="checkbox"
        id={classId}
      />

      <label className="form-check-label" htmlFor={classId}>
        {props.court.Name}
      </label>
    </div>
  );
};

export default CourtItem;
