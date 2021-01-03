import React from "react";

import "./DateForm.css";
import TimePicker from "../../TimePicker/TimePicker";
import CourtsList from "../Courts/CourtsList";
import CourtList from "../Courts/CourtsList";

class DateForm extends React.Component {
  onFormSubmit = () => {};

  selectedDateStartTime = () => {
    const dateString = this.props.selectedPlayingDate.StartTime;
    var date = new Date(dateString);
    let timeSting = "";
    timeSting += date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    timeSting += ":";
    timeSting +=
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return timeSting;
  };

  selectedDateEndTime = () => {
    const dateString = this.props.selectedPlayingDate.EndTime;
    var date = new Date(dateString);
    let timeSting = "";
    timeSting += date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    timeSting += ":";
    timeSting +=
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return timeSting;
  };

  closeTimePopUps = () => {
    return () => {
      this.setState({
        showHourPopUp: false,
        showMinPopUp: false,
      });
    };
  };

  componentDidMount() {
    let clickedInput = null;
    window.addEventListener("click", (e) => {
      if (this.timePicker1Ref.current.inputRef.current.contains(e.target)) {
        this.timePicker2Ref.current.closeTimePopUp();
        return;
      } else if (
        this.timePicker2Ref.current.inputRef.current.contains(e.target)
      ) {
        this.timePicker1Ref.current.closeTimePopUp();

        return;
      } else {
        this.timePicker1Ref.current.closeTimePopUp();
        this.timePicker2Ref.current.closeTimePopUp();
      }
    });
  }

  timePicker1Ref = React.createRef();
  timePicker2Ref = React.createRef();

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div className="start-time">
            <p>Start Time</p>
            <TimePicker
              ref={this.timePicker1Ref}
              time={this.selectedDateStartTime()}
              selectedDateId={this.props.selectedPlayingDate.Id}
              onStartTimeSubmit={this.props.onStartTimeSubmit}
              status="start-input"
            />
          </div>
          <div className="start-time">
            <p>End Time</p>
            <TimePicker
              ref={this.timePicker2Ref}
              time={this.selectedDateEndTime()}
              selectedDateId={this.props.selectedPlayingDate.Id}
              onEndTimeSubmit={this.props.onEndTimeSubmit}
              status="end-input"
            />
          </div>
          <div className="courts-form">
            <CourtList
              selectedPlayingDate={this.props.selectedPlayingDate}
              courts={this.props.courts}
              onCourtInputClick={this.props.onCourtInputClick}
            />
          </div>
          {/* <div className="save-dates">
            <button className="btn btn-primary">Save</button>
          </div> */}
        </form>
      </div>
    );
  }
}

export default DateForm;
