import { all } from "redux-saga/effects";
import { watchListsApp } from "../redux/lists";

export default function* rootSagas() {
    yield all([
      watchListsApp(),
    ])
}