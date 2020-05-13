import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Day from './components/day';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/today'>Today</Link>

        <Switch>
          <Route path='/today'>
            <Day />
          </Route>
          <Route path='/'>
            <h1>Home</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter;
