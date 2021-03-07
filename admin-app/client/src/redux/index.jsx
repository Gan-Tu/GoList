import { combineReducers } from "redux";
import ListReducer from "./lists/reducer";
import ItemsReducer from "./items/reducer";
import SessionReducer from "./session/reducer";


const reducers = combineReducers({
  ListReducer,
  ItemsReducer,
  SessionReducer,
});

export default reducers;
