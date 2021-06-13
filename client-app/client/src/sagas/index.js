import { all } from "redux-saga/effects";
import { watchListsApp } from "../redux/lists";
import { watchItemsApp } from "../redux/items";

export default function* rootSagas() {
  yield all([watchListsApp(), watchItemsApp()]);
}
