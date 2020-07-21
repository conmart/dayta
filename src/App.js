import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';

import { firebaseAppAuth } from './services/firebase';
import { StateProvider } from './state';
import { initialState } from './state/initialState';
import { reducer } from './state/reducer';
import AppRouter from './AppRouter';
import Login from './components/login';

import styles from './app.module.css';

const createComponentWithAuth = withFirebaseAuth({ firebaseAppAuth });

const App = ({ signOut, user }) => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className={styles.container}>
        {user ? (
          <AppRouter user={user} signOut={signOut} />
        ) : (
          <Login />
        )}
      </div>
    </StateProvider>
  );
};

export default createComponentWithAuth(App);
