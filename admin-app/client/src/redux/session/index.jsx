import { put, takeLatest } from "redux-saga/effects";
import { LOG_IN, LOG_OUT, SET_USER } from "../actionTypes";
import { firebase_app } from "../../data/config";

function* setUserAsync({ user }) {
  yield put({ type: SET_USER, user });
  yield put({ type: LOG_IN });
}

function* logOutAsync() {
  console.log("Logging out the user...");
  yield firebase_app.auth().signOut();
  yield put({ type: LOG_OUT });
  console.log("User is now logged out.");
}

export function* watchSessionApp() {
  yield takeLatest(SET_USER, setUserAsync);
  yield takeLatest(LOG_OUT, logOutAsync);
}
