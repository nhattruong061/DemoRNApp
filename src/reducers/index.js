import { combineReducers } from "redux";
import usersReducer from "./userReducer";

const rootReducer = combineReducers({
  user: usersReducer
});
export default rootReducer;
