import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Calendar from './components/calendar';
import Category from './components/singleCategory';
import CategoryList from './components/categoryList'
import Day from './components/day';
import Event from './components/event';
import MenuContainer from './components/menu';
import NewEventButton from './components/newEventButton';

const AppRouter = () => {
  return (
    <Router>
      <MenuContainer />
      <Switch>
        <Route path="/calendar">
          <Calendar />
          <NewEventButton />
        </Route>
        <Route path="/categories">
          <CategoryList />
          <NewEventButton />
        </Route>
        <Route path="/category">
          <Category />
          <NewEventButton />
        </Route>
        <Route path="/event">
          <Event />
        </Route>
        <Route path="/">
          <Day />
          <NewEventButton />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
