import React from "react";
import TournamentContext from "../../contexts/TournamentContext";

class ContextMenu extends React.Component {
  static contextType = TournamentContext;

  state = {
    xPos: "0px",
    yPos: "0px",
    showMenu: false,
    el: "",
    target: null,
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClick);
    document.addEventListener("contextmenu", this.handleContextMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("contextmenu", this.handleContextMenu);
  }

  handleClick = (e) => {
    if (this.state.showMenu) {
      this.setState({ showMenu: false });
    }
  };

  handleContextMenu = (e) => {
    if (e.target.className == "match") {
      e.preventDefault();
      console.log(e.target);
      this.setState({
        xPos: `${e.pageX}px`,
        yPos: `${e.pageY}px`,
        showMenu: true,
        el: "match",
        target: e.target,
      });
    } else if (e.target.className == "timeslot") {
      e.preventDefault();
      this.setState({
        xPos: `${e.pageX}px`,
        yPos: `${e.pageY}px`,
        showMenu: true,
        el: "timeslot",
        target: e.target,
      });
    }
  };

  onCopyClick = () => {
    const coppiedMatchId = this.state.target.getAttribute("data-matchid");
    this.props.copyMatch(coppiedMatchId);
  };

  onPasteClick = () => {
    const initialFieldId = this.state.target.getAttribute("slotid");
    this.props.pasteMatch(initialFieldId);
  };

  render() {
    const { showMenu, xPos, yPos, el, target } = this.state;
    const copyMenu = (
      <div
        style={{ position: "absolute", top: yPos, left: xPos, zIndex: "10" }}
        className="copyMenu"
        onClick={this.onCopyClick}
      >
        Copy Match
      </div>
    );
    const pasteMenu = (
      <div
        style={{ position: "absolute", top: yPos, left: xPos, zIndex: "10" }}
        className="pasteMenu"
        onClick={this.onPasteClick}
      >
        Paste Match
      </div>
    );

    if (showMenu) {
      if (el === "match") {
        return copyMenu;
      } else if (el === "timeslot" && this.context.isMatchCoppied == true) {
        return pasteMenu;
      } else return null;
    } else return null;
  }
}

export default ContextMenu;
