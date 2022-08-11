import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import configureStore, { sagaMiddleware } from './modules/redux/store';
import globalSaga from './modules/redux/saga/globalSaga';
import Login from '@/containers/auth/Login';

export const store = configureStore();
sagaMiddleware.run(globalSaga);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
       <Routes>
        <Route path='/authLogin' element={<Login />} />
       </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
