import React from 'react';
import firebase from 'firebase/app';
import withFirebaseAuth from 'react-with-firebase-auth';

import { firebaseApp } from './services/firebase';

import { StateProvider } from './state';
import { initialState } from './state/initialState';
import { reducer } from './state/reducer';
import AppRouter from './AppRouter';
import Login from './components/login';

import styles from './app.module.css';

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth,
});

const App = ({ user, signInWithGoogle, signOut }) => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <div className={styles.mobileAppContainer}>
      {user ? (
        <AppRouter user={user} signOut={signOut} />
      ) : (
        <Login signInWithGoogle={signInWithGoogle} />
      )}
    </div>
  </StateProvider>
);

export default createComponentWithAuth(App);
