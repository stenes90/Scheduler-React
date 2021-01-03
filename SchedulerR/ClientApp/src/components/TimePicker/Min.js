import React from "react";

const Min = (props) => {
  return (
    <div
      className={`min pop-up container ${
        props.showMinPopUp === false ? "hide" : ""
      }`}
    >
      <div className="row">
        <div onClick={props.onMinClick} name="00" className="col col-3">
          {props.selectedHour}:00
        </div>
        <div onClick={props.onMinClick} name="05" className="col col-3">
          {props.selectedHour}:05
        </div>
        <div onClick={props.onMinClick} name="10" className="col col-3">
          {props.selectedHour}:10
        </div>
        <div onClick={props.onMinClick} name="15" className="col col-3">
          {props.selectedHour}:15
        </div>
      </div>
      <div className="row">
        <div onClick={props.onMinClick} name="20" className="col col-3">
          {props.selectedHour}:20
        </div>
        <div onClick={props.onMinClick} name="25" className="col col-3">
          {props.selectedHour}:25
        </div>
        <div onClick={props.onMinClick} name="30" className="col col-3">
          {props.selectedHour}:30
        </div>
        <div onClick={props.onMinClick} name="35" className="col col-3">
          {props.selectedHour}:35
        </div>
      </div>
      <div className="row">
        <div onClick={props.onMinClick} name="40" className="col col-3">
          {props.selectedHour}:40
        </div>
        <div onClick={props.onMinClick} name="45" className="col col-3">
          {props.selectedHour}:45
        </div>
        <div onClick={props.onMinClick} name="50" className="col col-3">
          {props.selectedHour}:50
        </div>
        <div onClick={props.onMinClick} name="55" className="col col-3">
          {props.selectedHour}:55
        </div>
      </div>
    </div>
  );
};

export default Min;
