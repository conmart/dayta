import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { FirebaseAuthConsumer } from '@react-firebase/auth';

import Calendar from './components/calendar';
import Category from './components/singleCategory';
import CategoryList from './components/categoryList';
import Day from './components/day';
import Event from './components/event';
import Login from './components/login';
import MenuContainer from './components/menu';
import NewEventButton from './components/newEventButton';

const AppRouter = () => {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => (
        <Router>
          {isSignedIn && (
            <Fragment>
              <MenuContainer />
              <NewEventButton />
            </Fragment>
          )}
          <Switch>
            <Route path="/calendar">
              {isSignedIn ? <Calendar /> : <Redirect to="/login" />}
            </Route>
            <Route path="/categories">
              {isSignedIn ? <CategoryList /> : <Redirect to="/login" />}
            </Route>
            <Route path="/category">
              {isSignedIn ? <Category /> : <Redirect to="/login" />}
            </Route>
            <Route path="/event">
              {isSignedIn ? <Event /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {!isSignedIn ? <Login /> : <Redirect to="/" />}
            </Route>
            <Route path="/">
              {isSignedIn ? <Day /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
      )}
    </FirebaseAuthConsumer>
  );
};

export default AppRouter;
