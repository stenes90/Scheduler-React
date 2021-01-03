import React from "react";

const Hour = (props) => {
  return (
    <div
      className={`hour pop-up container ${
        props.showHourPopUp === false ? "hide" : ""
      }`}
    >
      <div className="row">
        <div onClick={props.onHourClick} name="00" className="col col-3">
          00:00
        </div>
        <div onClick={props.onHourClick} name="01" className="col col-3">
          01:00
        </div>
        <div onClick={props.onHourClick} name="02" className="col col-3">
          02:00
        </div>
        <div onClick={props.onHourClick} name="03" className="col col-3">
          03:00
        </div>
      </div>
      <div className="row">
        <div onClick={props.onHourClick} name="04" className="col col-3">
          04:00
        </div>
        <div onClick={props.onHourClick} name="05" className="col col-3">
          05:00
        </div>
        <div onClick={props.onHourClick} name="06" className="col col-3">
          06:00
        </div>
        <div onClick={props.onHourClick} name="07" className="col col-3">
          07:00
        </div>
      </div>
      <div className="row">
        <div onClick={props.onHourClick} name="08" className="col col-3">
          08:00
        </div>
        <div onClick={props.onHourClick} name="09" className="col col-3">
          09:00
        </div>
        <div onClick={props.onHourClick} name="10" className="col col-3">
          10:00
        </div>
        <div onClick={props.onHourClick} name="11" className="col col-3">
          11:00
        </div>
      </div>
      <div className="row">
        <div onClick={props.onHourClick} name="12" className="col col-3">
          12:00
        </div>
        <div onClick={props.onHourClick} name="13" className="col col-3">
          13:00
        </div>
        <div onClick={props.onHourClick} name="14" className="col col-3">
          14:00
        </div>
        <div onClick={props.onHourClick} name="15" className="col col-3">
          15:00
        </div>
      </div>
      <div className="row">
        <div onClick={props.onHourClick} name="16" className="col col-3">
          16:00
        </div>
        <div onClick={props.onHourClick} name="17" className="col col-3">
          17:00
        </div>
        <div onClick={props.onHourClick} name="18" className="col col-3">
          18:00
        </div>
        <div onClick={props.onHourClick} name="19" className="col col-3">
          19:00
        </div>
      </div>
      <div className="row">
        <div onClick={props.onHourClick} name="20" className="col col-3">
          20:00
        </div>
        <div onClick={props.onHourClick} name="21" className="col col-3">
          21:00
        </div>
        <div onClick={props.onHourClick} name="22" className="col col-3">
          22:00
        </div>
        <div onClick={props.onHourClick} name="23" className="col col-3">
          23:00
        </div>
      </div>
    </div>
  );
};

export default Hour;
