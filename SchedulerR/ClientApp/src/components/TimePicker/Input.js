import React from "react";

const Input = (props) => {
  return (
    <div className="input-group">
      <input
        onClick={props.onInputClick}
        type="text"
        className="form-control"
        value={props.value}
      />
      <span>
        <i className="fas fa-clock"></i>
      </span>
    </div>
  );
};

export default Input;
