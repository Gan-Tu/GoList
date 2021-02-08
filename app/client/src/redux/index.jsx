import { combineReducers } from "redux";
import ListReducer from "./lists/reducer";
import ItemsReducer from "./items/reducer";


const reducers = combineReducers({
  ListReducer,
  ItemsReducer,
});

export default reducers;
