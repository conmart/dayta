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
import Login from './components/login';
import MenuContainer from './components/menu';
import NewEventButton from './components/newEventButton';

const AppRouter = () => {
  const [{ userId, selectedCategory }, dispatch] = useGlobalState();

  // const updateUser = (uid) => dispatch({ type: 'SET_USER', userId: uid });

  const devSignIn = true;
  return (
    <Router>
      {devSignIn && (
        <Fragment>
          <MenuContainer />
          <NewEventButton />
        </Fragment>
      )}
      <Switch>
        <Route path="/calendar">
          {devSignIn ? <Calendar /> : <Redirect to="/login" />}
        </Route>
        <Route path="/categories">
          {devSignIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/category">
          {devSignIn && selectedCategory ? (
            <Category />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/event">
          {devSignIn ? <Event /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!devSignIn ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/">{devSignIn ? <Day /> : <Redirect to="/login" />}</Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
