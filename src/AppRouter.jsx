import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Menu from './components/menu';
import Day from './components/day';
import Calendar from './components/calendar';

const AppRouter = () => {
  return (
    <Router>
        <Menu />
        <Switch>
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route path="/today">
            <Day />
          </Route>
          <Route path="/">
            <h1>test</h1>
          </Route>
        </Switch>
    </Router>
  );
}

export default AppRouter;
