import React from 'react';

import { StateProvider } from "./state";
import { initialState } from "./state/initialState";
import { reducer } from "./state/reducer";

import AppRouter from './AppRouter';

const App = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <div className="App">
      <AppRouter />
    </div>
  </StateProvider>
);

export default App;
