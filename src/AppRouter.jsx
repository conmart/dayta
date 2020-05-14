import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Calendar from './components/calendar';
import CategoryList from './components/categoryList'
import Day from './components/day';
import MenuContainer from './components/menu';

const AppRouter = () => {
  return (
    <Router>
        <MenuContainer />
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
