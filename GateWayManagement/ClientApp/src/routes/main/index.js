import React from "react";
import {Route, Switch} from "react-router-dom";
import Widgets from "./Widgets";
import Metrics from "./Metrics";
import Dashboard from "./dashboard";
import Layouts from "./Layouts";

const Main = ({match}) => (
  <Switch>
    <Route path={`${match.url}/dashboard`} component={Dashboard}/>
    <Route path={`${match.url}/widgets`} component={Widgets}/>
    <Route path={`${match.url}/metrics`} component={Metrics}/>
    <Route path={`${match.url}/layouts`} component={Layouts}/>
  </Switch>
);

export default Main;
