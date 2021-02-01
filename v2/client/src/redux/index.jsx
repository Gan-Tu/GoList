import { combineReducers } from "redux";
import ListReducer from "./lists/reducer";
import Customizer from "./customizer/reducer";

const reducers = combineReducers({
  Customizer,
  ListReducer,
});

export default reducers;
