import React from "react";

import ClassItem from "./ClassItem";
import "./ClassItem.css";

class ClassesList extends React.Component {
  renderedList = () => {
    const rend = this.props.classes.map((c) => {
      return (
        <ClassItem
          key={c.Id}
          id={c.Id}
          name={c.Name}
          onClassSelect={this.props.onClassSelect}
        />
      );
    });

    return rend;
  };

  render() {
    return (
      <div>
        <label htmlFor="class-dropdown">Class: </label>
        <div className="btn-group">
          <button
            className="btn btn-secondary btn-sm dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            id="class-dropdown"
          >
            {this.props.selectedClass.Name}
          </button>
          <div className="dropdown-menu">{this.renderedList()}</div>
        </div>
      </div>
    );
  }
}

export default ClassesList;
