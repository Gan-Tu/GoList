import { combineReducers } from "redux";
import urlReducer from "./url";

export default combineReducers({
  urls: urlReducer,
});
