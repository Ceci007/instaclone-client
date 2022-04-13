import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { createMemoryHistory } from 'history';

import Home from "../pages/Home";
import User from "../pages/User";
import Error404 from "../pages/Error404";
import BasicLayout from "../layouts/BasicLayout";

export const history = createMemoryHistory();

export default function AppRouter() {
  return (
    <Router history={history}>
        <BasicLayout>
            <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/:username" component={User} exact={true} />
                <Route component={Error404} />
            </Switch>
        </BasicLayout>
    </Router>
  );
}
