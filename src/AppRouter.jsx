import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useGlobalState } from './state';

import Calendar from './components/calendar';
import Category from './components/singleCategory';
import CategoryList from './components/categoryList';
import Day from './components/day';
import Event from './components/event';
import MenuContainer from './components/menu';
import NewEventButton from './components/newEventButton';

const AppRouter = ({ user, signOut }) => {
  const { selectedCategory } = useGlobalState()[0];

  return (
    <Router>
      <Fragment>
        <MenuContainer signOut={signOut} />
        <NewEventButton />
      </Fragment>
      <Switch>
        <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/categories">
          <CategoryList />
        </Route>
        <Route path="/category">
          {selectedCategory ? <Category /> : <Redirect to="/" />}
        </Route>
        <Route path="/event">
          <Event />
        </Route>
        <Route path="/">
          <Day />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
