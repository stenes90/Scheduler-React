import React from 'react';

import Tournament from '../../tournament.json';
//import Tournament from '../../Tournament2.json';



class Timetable extends React.Component {

    state = {
        tournament: Tournament.data };

    logIt = () => {
        console.log(this.state.tournament);
    }
   componentDidMount() {
        console.log(this.state.tournament)
    //    // Simple POST request with a JSON body using fetch
    //    const requestOptions = {
    //        method: 'POST',
    //        headers: { 'Content-Type': 'application/json' },
    //        body: JSON.stringify(this.state.tournament),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //    };
    //    fetch('https://localhost:44391/Home/AddTn', requestOptions);
    //        //.then(response => response.json())
    //        //.then(data => this.setState({ postId: data.id }));
    }

    render() {

        return <div>Timetable</div>
    }
}

export default Timetable;