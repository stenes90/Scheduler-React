import React from "react";
import * as moment from "moment";
import axios from "axios";

import Tournament from "../../tournament.json";
import DatesList from "./PlayingDates/DatesList";
import DateForm from "./DatesForm/DateForm";
import ClassesList from "./Classes/ClassesList";
import ClassesForm from "./Classes/ClassesForm";
import TournamentContext from "../../contexts/TournamentContext";

class TimesPage extends React.Component {
  state = {
    tournament: Tournament.data,
    selectedDateId: null,
    selectedClass: null,
  };

  logTN = () => {
    console.log(this.state);
  };

  componentDidMount() {
    //this.props.getTN(this.state.tournament);
    if (!this.state.tournament.PlayingDates) {
      let dateStrings = [];
      const classes = this.state.tournament.Classes;
      classes.forEach((item) => {
        item.PlayingDatesStrings.forEach((string) => {
          dateStrings.push(string);
        });
      });
      //const uniqueDatesId = [...new Set(plDates.map((c) => c.Id))];
      const uniqueDateStrings = [...new Set(dateStrings)];
      let dateId = 1;
      let PlayingDates = [];
      uniqueDateStrings.forEach((date) => {
        let playingDate = {};
        let startTime = new Date(date).setHours(8, 0, 0);
        startTime = moment(startTime).format();
        let endTime = new Date(date).setHours(22, 0, 0);
        endTime = moment(endTime).format();

        playingDate.Id = dateId;
        playingDate.StartTime = startTime;
        playingDate.EndTime = endTime;
        playingDate.Courts = this.state.tournament.Courts;
        PlayingDates.push(playingDate);
        dateId++;
      });
      let tn = this.state.tournament;
      let courts = tn.Courts;
      courts.forEach((court) => {
        court.checked = true;
      });

      classes.forEach((item) => {
        item.PlayingDatesStrings.forEach((string) => {
          let day = new Date(string).getDay();
          PlayingDates.forEach((date) => {
            let dayy = new Date(date.StartTime).getDay();
            if (day == dayy) {
              item.PlayingDates.push(date);
            }
          });
        });
      });

      tn.PlayingDates = PlayingDates;
      this.setState({
        selectedDateId: PlayingDates[0].Id,
        tournament: tn,
        selectedClass: tn.Classes[0],
      });
    } else {
      debugger;
      // this part need to be coded. This is scenario when from the API I get tournament with already modified(saved in DB) PlayingDates models
    }
    // const playingDates = this.setPlayingDates();
    // let selectedDate = playingDates[0].Id;
    // let tn = this.state.tournament;
    // tn.PlayingDates = playingDates;
    // tn.PlayingDates.map((p) => p.Courts.map((c) => (c.checked = true)));
    // this.setState({
    //   selectedDateId: selectedDate,
    //   tournament: tn,
    //   selectedClass: tn.Classes[0],
    // });
  }

  // componentDidUpdate() {
  //   console.log(this.state);
  //   //this.props.getTN(this.state.tournament);
  // }

  selectedPlayingDate = () => {
    return this.state.tournament.PlayingDates.find(
      (c) => c.Id === this.state.selectedDateId
    );
  };

  //returns all playing dates extraced from classes as objects
  // setPlayingDates = () => {
  //   debugger;
  //   let classes = this.state.tournament.Classes;
  //   let plDates = [];
  //   for (let item of classes) {
  //     for (let date of item.PlayingDates) {
  //       date.Courts = this.state.tournament.Courts;
  //       plDates.push(date);
  //     }
  //   }
  //   const uniqueDatesId = [...new Set(plDates.map((c) => c.Id))];
  //   let uniqueDateObjects = [];
  //   for (let item of uniqueDatesId) {
  //     uniqueDateObjects.push(plDates.find((c) => c.Id === item));
  //   }
  //   return uniqueDateObjects;
  // };

  onDateClick = (dateId) => {
    const tn = this.state.tournament;
    const courts = tn.Courts;
    const selectedPlayingDate = this.state.tournament.PlayingDates.find(
      (c) => c.Id === dateId
    );
    courts.map((court) => {
      if (selectedPlayingDate.Courts.includes(court)) {
        court.checked = true;
      } else {
        court.checked = false;
      }
    });
    this.setState({ tournament: tn, selectedDateId: dateId });
  };

  onStartTimeSubmit = (h, m) => {
    let startTimeString = this.selectedPlayingDate().StartTime;
    let jsDate = new Date(startTimeString);
    jsDate.setHours(h);
    jsDate.setMinutes(m);
    startTimeString = moment(jsDate).format();
    let tn = this.state.tournament;
    tn.PlayingDates.find(
      (c) => c.Id === this.selectedPlayingDate().Id
    ).StartTime = startTimeString;
    this.setState({ tournament: tn });
  };

  onEndTimeSubmit = (h, m) => {
    let endTimeString = this.selectedPlayingDate().EndTime;
    let jsDate = new Date(endTimeString);
    jsDate.setHours(h);
    jsDate.setMinutes(m);
    endTimeString = moment(jsDate).format();
    let tn = this.state.tournament;
    tn.PlayingDates.find(
      (c) => c.Id === this.selectedPlayingDate().Id
    ).EndTime = endTimeString;
    this.setState({ tournament: tn });
  };

  onDatesFormSubmit = () => {
    const playingDate = this.selectedPlayingDate();
    let startTime = new Date(playingDate.StartTime);
    startTime.setHours();
  };

  onCourtInputClick = (id) => {
    let selectedPlayingDate = this.selectedPlayingDate();
    const tnnn = this.state.tournament;

    let clickedCourt = tnnn.Courts.find((c) => c.Id == id);
    if (selectedPlayingDate.Courts.includes(clickedCourt)) {
      //if clicked court is in the list of courts, it is removed from the list
      let indexOfCourtInCourtsArr = selectedPlayingDate.Courts.indexOf(
        clickedCourt
      );
      //const filteredItems = items.slice(0, i).concat(items.slice(i + 1, items.length))
      selectedPlayingDate.Courts = selectedPlayingDate.Courts.slice(
        0,
        indexOfCourtInCourtsArr
      ).concat(
        selectedPlayingDate.Courts.slice(
          indexOfCourtInCourtsArr + 1,
          selectedPlayingDate.Courts.length
        )
      );
    } else {
      selectedPlayingDate.Courts.push(clickedCourt);
    }

    const courts = this.state.tournament.Courts;

    courts.map((court) => {
      if (selectedPlayingDate.Courts.includes(court)) {
        court.checked = true;
      } else {
        court.checked = false;
      }
    });

    console.log(tnnn);
    this.setState({ tournament: tnnn });
  };
  onDurationInputChange = (val) => {
    const classs = this.state.selectedClass;
    classs.MatchDuration = val;
    this.setState({ selectedClass: classs });
  };

  onBreakInputChange = (val) => {
    const classs = this.state.selectedClass;
    classs.BreakBetweenMatches = val;
    this.setState({ selectedClass: classs });
  };

  onClassSelect = (id) => {
    const selectedClass = this.state.tournament.Classes.find(
      (c) => c.Id === id
    );
    this.setState({ selectedClass: selectedClass });
  };

  onSaveForm = async () => {
    //const response = await fetch(
    //   "https://192.168.100.10:45466//Tournament/apicheck",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       // Id: this.state.tournament.Id,
    //       // StartDate: this.state.tournament.StartDate,
    //       // EndDate: this.state.tournament.EndDate,
    //       // Courts: this.state.tournament.Courts,
    //       // PlayingDates: this.state.tournament.PlayingDates,
    //       // Matches: this.state.tournament.Matches,
    //       // Classes: this.state.tournament.Classes,
    //       Tournament: this.state.tournament,
    //     }),
    //   }
    // );

    console.log(JSON.stringify(this.state.tournament));
  };

  render() {
    this.logTN();
    if (!this.state.tournament.PlayingDates) {
      return <div></div>;
    } else {
      return (
        <div>
          <TournamentContext.Provider
            value={{
              playingDates: this.state.tournament.PlayingDates,
              selectedDateId: this.state.selectedDateId,
            }}
          >
            <DatesList
              playingDates={this.state.tournament.PlayingDates}
              selectedDateId={this.state.selectedDateId}
              onDateClick={this.onDateClick}
            />
            <DateForm
              onCourtInputClick={this.onCourtInputClick}
              courts={this.state.tournament.Courts}
              selectedPlayingDate={this.selectedPlayingDate()}
              onStartTimeSubmit={this.onStartTimeSubmit}
              onEndTimeSubmit={this.onEndTimeSubmit}
            />
            <ClassesList
              classes={this.state.tournament.Classes}
              selectedClass={this.state.selectedClass}
              onClassSelect={this.onClassSelect}
            />
            <ClassesForm
              selectedClass={this.state.selectedClass}
              onDurationInputChange={this.onDurationInputChange}
              onBreakInputChange={this.onBreakInputChange}
            />
            <div className="save-dates">
              <button className="btn btn-primary" onClick={this.onSaveForm}>
                Save
              </button>
            </div>
          </TournamentContext.Provider>
        </div>
      );
    }
  }
}

export default TimesPage;
