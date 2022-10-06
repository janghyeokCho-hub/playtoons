import { combineReducers } from "redux";
import alertModal from "./modal";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import login from "./login";
import loading from "./loading";
import author from "./author";

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  login,
  loading,
  alertModal,
  author,
});

const rootReducer = (state, action) => {
  if (action.type === "login/LOGOUT") {
    // Clear User Data
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
