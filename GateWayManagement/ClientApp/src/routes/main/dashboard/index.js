import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const Dashboard = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/general`}/>
    <Route path={`${match.url}/general`} component={asyncComponent(() => import('./General/General'))}/>
    <Route path={`${match.url}/profile`} component={asyncComponent(() => import('./Profile/Profile'))}/>
    <Route path={`${match.url}/order`} component={asyncComponent(() => import('./Order/Order'))}/>
    <Route path={`${match.url}/event/game/win-wheel`} component={asyncComponent(() => import('./Event/components/games/WinWheel/WinWheelGame'))}/>
    <Route path={`${match.url}/event`} component={asyncComponent(() => import('./Event/Event'))}/>
    <Route path={`${match.url}/exchange`} component={asyncComponent(() => import('./Exchange/Exchange'))}/>
    <Route path={`${match.url}/promotion`} component={asyncComponent(() => import('./Promotion/Promotion'))}/>
    <Route path={`${match.url}/order-processing`} component={asyncComponent(() => import('./OrderProcessing/OrderProcessing'))}/>
  </Switch>
);

export default Dashboard;
