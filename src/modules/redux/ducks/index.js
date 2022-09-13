import { combineReducers } from "redux";
import alertModal from "./modal";

import login from "./login";
import loading from "./loading";

const appReducer = combineReducers({
  login,
  loading,
  alertModal,
});

const rootReducer = (state, action) => {
  if (action.type === "login/LOGOUT") {
    // Clear User Data
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
