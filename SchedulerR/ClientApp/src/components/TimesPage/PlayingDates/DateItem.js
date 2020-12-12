import React from 'react'

import './DateItem.css'

class DateItem extends React.Component{

   daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOE', 'DEC'];

    onDateClick = () => {
        this.props.onDateClick(this.props.id);
    }

    

    render() {
        return (
            <div onClick={this.onDateClick} className={this.props.selectedDateId === this.props.id ? "date-item selected" : "date-item" }>
                <div className="day-of-week">{this.daysOfWeek[this.props.date.getDay()]}</div>
                <div className="day-of-month">{this.props.date.getDay()}</div>
                <div className="month">{this.months[this.props.date.getMonth()]}</div>
            </div>
            );
    }
}

export default DateItem;
