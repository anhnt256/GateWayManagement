import React from "react";
import {ConnectedRouter} from "react-router-redux";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import "assets/vendors/style";
import "styles/wieldy.less";
import store from "./redux/store";
import App from "./containers/App/index";

const history = createHistory();

const NextApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </ConnectedRouter>
  </Provider>;


export default NextApp;
