import React from 'react';

import { StateProvider } from './state';
import { initialState } from './state/initialState';
import { reducer } from './state/reducer';
import AppRouter from './AppRouter';

import styles from './app.module.css';

const App = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <div className={styles.mobileAppContainer}>
      <AppRouter />
    </div>
  </StateProvider>
);

export default App;
