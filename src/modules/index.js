import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import users from "./users";
import ui from "./ui";
import me from "./me";

export default combineReducers({
  routing: routerReducer,
  ui,
  me,
  users
});
