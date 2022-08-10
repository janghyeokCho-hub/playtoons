import React from 'react';

import { Provider } from 'react-redux';
import Setup from './containers/Setup';
import { BrowserRouter } from 'react-router-dom';
import configureStore, { sagaMiddleware } from './modules/redux/store';
import globalSaga from './modules/redux/saga/globalSaga';

export const store = configureStore();
sagaMiddleware.run(globalSaga);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Setup />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
