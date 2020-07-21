import React, { Fragment, useEffect } from 'react';
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
import NavButtons from './components/navButtons';

const AppRouter = ({ user, signOut }) => {
  const [{ selectedCategory, uid }, dispatch] = useGlobalState();

  useEffect(() => {
    dispatch({ type: 'SET_USER', uid: user.uid })
  }, [user, dispatch])

  const trackedSignOut = () => {
    dispatch({ type: 'SET_LOGOUT', loggedOut: true })
    signOut();
  }

  return (
    <Fragment>
      {uid && (
        <Router>
          <Fragment>
            <MenuContainer signOut={trackedSignOut} />
            <NavButtons />
          </Fragment>
          <Switch>
            <Route path="/calendar">
              <Calendar />
            </Route>
            <Route path="/categories">
              <CategoryList />
            </Route>
            <Route path="/category">
              {selectedCategory ? <Category /> : <Redirect to="/categories" />}
            </Route>
            <Route path="/event">
              <Event />
            </Route>
            <Route path="/">
              <Day />
            </Route>
          </Switch>
        </Router>
      )}
    </Fragment>
  );
};

export default AppRouter;
