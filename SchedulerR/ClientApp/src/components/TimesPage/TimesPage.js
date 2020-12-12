import React from 'react';

import Tournament from '../../tournament.json';
import DatesList from './PlayingDates/DatesList';
import DateForm from './DatesForm/DateForm';



class TimesPage extends React.Component {
    state = {
        tournament: Tournament.data,
        selectedDateId: null
    };

    logTN = () => {
        console.log(this.state.tournament);
    };

    componentDidMount() {
        this.logTN();
        this.setState({ selectedDateId: this.playingDates()[0].Id })
    };

    playingDates = () => {
        let classes = this.state.tournament.Classes;
        let plDates = [];
        for (let item of classes) {
            for (let date of item.PlayingDates) {
                plDates.push(date)
            }
        }
        const uniqueDatesId = [...new Set(plDates.map(c => c.Id))];
        let uniqueDateObjects = [];
        for (let item of uniqueDatesId) {
            uniqueDateObjects.push(plDates.find(c => c.Id === item));
        }
        //console.log(uniqueDateObjects)
        return uniqueDateObjects;
    }

    onDateClick = (dateId) => {
        this.setState({ selectedDateId: dateId })
    };
    

    render() {
        return (
            
            <div>
                <DatesList
                    playingDates={this.playingDates()}
                    selectedDateId={this.state.selectedDateId}
                    onDateClick={this.onDateClick}
                />
                <DateForm />
              
            </div>
        );
    }
}

export default TimesPage;
