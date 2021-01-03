import React from "react";

const ClassItem = (props) => {
  const onClassSelect = () => {
    props.onClassSelect(props.id);
  };

  return (
    <a className="dropdown-item" href="#" onClick={onClassSelect}>
      {props.name}
    </a>
  );
};

export default ClassItem;
