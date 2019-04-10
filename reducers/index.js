import { combineReducers } from "redux";
import usersReducer from "./userReducer.js";

const rootReducer = combineReducers({
  user: usersReducer
});
export default rootReducer;
