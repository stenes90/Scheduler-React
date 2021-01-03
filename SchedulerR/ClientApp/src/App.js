import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import Timetable from "./components/Timetable/Timetable.js";
import Tournament from "./tournament.json";

import TimesPage from "../src/components/TimesPage/TimesPage";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;
  state = { tournament: {} };

  componentDidMount() {}

  showTimes = () => {
    if (
      window.location.pathname === "/Times" ||
      window.location.pathname === "/"
    ) {
      return <TimesPage getTN={this.getTN} />;
    }
  };

  showTimetable = () => {
    if (window.location.pathname === "/Timetable") {
      return <Timetable />;
    }
  };

  render() {
    return (
      //<Layout>
      //  <Route exact path='/' component={Home} />
      //  <Route path='/counter' component={Counter} />
      //  <AuthorizeRoute path='/fetch-data' component={FetchData} />
      //  <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      //</Layout>
      <div>
        <div className="navbarr">
          <a href="/Times">Times </a>
          <a href="/Timetable"> Timetable</a>
        </div>
        {this.showTimes()}
        {this.showTimetable()}
      </div>
    );
  }
}
