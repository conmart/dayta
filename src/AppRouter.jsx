import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Calendar from './components/calendar';
import CategoryList from './components/categoryList'
import Day from './components/day';
import Menu from './components/menu';

const AppRouter = () => {
  return (
    <Router>
        <Menu />
        <Switch>
          <Route path='/calendar'>
            <Calendar />
          </Route>
          <Route path='/categories'>
            <CategoryList />
          </Route>
          <Route path='/'>
            <Day />
          </Route>
        </Switch>
    </Router>
  );
}

export default AppRouter;
