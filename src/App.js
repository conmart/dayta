import React from 'react';

import { StateProvider } from "./state";
import { initialState } from "./state/initialState";
import { reducer } from "./state/reducer";

const App = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <div className="App">
      Hello World
    </div>
  </StateProvider>
);

export default App;
