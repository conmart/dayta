import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { FirestoreProvider } from '@react-firebase/firestore';

import { StateProvider } from './state';
import { initialState } from './state/initialState';
import { reducer } from './state/reducer';
import AppRouter from './AppRouter';
import { firebaseConfig } from './firebaseConfig';

import styles from './app.module.css';

const App = () => (
  <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
    <FirestoreProvider firebase={firebase} {...firebaseConfig}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <div className={styles.mobileAppContainer}>
          <AppRouter />
        </div>
      </StateProvider>
    </FirestoreProvider>
  </FirebaseAuthProvider>
);

export default App;
