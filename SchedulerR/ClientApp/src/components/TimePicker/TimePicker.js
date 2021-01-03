import React from "react";

import Hour from "./Hour";
import Min from "./Min";
import Input from "./Input";
import "./TimePicker.css";

class TimePicker extends React.Component {
  state = {
    hour: "",
    minutes: "",
    showHourPopUp: false,
    showMinPopUp: false,
    selectedHour: "",
    selectedMin: "",
    value: "",
  };

  onInputClick = (e) => {
    console.log("input clicked");
    e.preventDefault();
    this.setState({
      showHourPopUp: true,
      selectedHour: "",
      selectedMin: "",
      showMinPopUp: false,
    });
  };

  onHourClick = (e) => {
    this.setState({
      showHourPopUp: false,
      showMinPopUp: true,
      selectedHour: e.target.attributes.name.value,
    });
  };

  onMinClick = (e) => {
    let val = "";
    val += this.state.selectedHour;
    val += ":";
    val += e.target.attributes.name.value;
    if (this.props.status === "start") {
      this.props.onStartTimeSubmit(
        this.state.selectedHour,
        e.target.attributes.name.value
      );
    } else
      this.props.onEndTimeSubmit(
        this.state.selectedHour,
        e.target.attributes.name.value
      );
    this.setState({
      showHourPopUp: false,
      showMinPopUp: false,
      selectedMin: e.target.attributes.name.value,
      value: val,
      hour: this.state.selectedHour,
      min: e.target.attributes.name.value,
    });
  };

  closeTimePopUp = () => {
    this.setState({
      showHourPopUp: false,
      showMinPopUp: false,
    });
  };

  // componentDidMount() {
  //   debugger;
  //   console.log(this.inputRef);
  //   let counter = 0;
  //   const clickCb = (e) => {
  //     console.log(e.target);
  //     debugger;
  //     if (this.inputRef.current.contains(e.target)) {
  //       return;
  //     }
  //     this.setState({
  //       showHourPopUp: false,
  //       showMinPopUp: false,
  //     });
  //   };
  //   window.addEventListener("click", (e) => clickCb(e));
  // }

  inputRef = React.createRef();

  render() {
    return (
      <div ref={this.inputRef} className={`time-input ${this.props.status}`}>
        <Input
          onInputClick={this.onInputClick}
          status={this.props.status}
          value={this.props.time}
        />

        <Hour
          showHourPopUp={this.state.showHourPopUp}
          onHourClick={this.onHourClick}
        />
        <Min
          showMinPopUp={this.state.showMinPopUp}
          selectedHour={this.state.selectedHour}
          onMinClick={this.onMinClick}
        />
      </div>
    );
  }
}

export default TimePicker;
