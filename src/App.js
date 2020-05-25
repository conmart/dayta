import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';

import { StateProvider } from './state';
import { initialState } from './state/initialState';
import { reducer } from './state/reducer';
import AppRouter from './AppRouter';
import { firebaseConfig } from './firebaseConfig';

import styles from './app.module.css';

const App = () => (
  <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className={styles.mobileAppContainer}>
        <AppRouter />
      </div>
    </StateProvider>
  </FirebaseAuthProvider>
);

export default App;
