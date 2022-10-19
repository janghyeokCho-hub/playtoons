import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import login from "./login";
import loading from "./loading";
import author from "./author";
import post from "./post";
import alertModal from "./modal";
import dashboard from "./dashboard";

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  login,
  loading,
  alertModal,
  author,
  post,
  dashboard,
});

const rootReducer = (state, action) => {
  if (action.type === "login/LOGOUT") {
    // Clear User Data
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
