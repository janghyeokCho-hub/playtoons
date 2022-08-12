import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import configureStore, { sagaMiddleware } from "./modules/redux/store";
import globalSaga from "./modules/redux/saga/globalSaga";
import DashboardSeries from "@/containers/dashboardSeries/DashboardSeries";
import Account from "@CONTAINERS/account/Account";

export const store = configureStore();
sagaMiddleware.run(globalSaga);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard-series" element={<DashboardSeries />} />
          <Route path="/auth-login" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
