import { put, takeLatest } from "redux-saga/effects";
import { LOG_IN, LOG_OUT, SET_AUTHENTICATED_USER } from "../actionTypes";
import { firebase_app } from "../../data/config";

function* loginAsync({ user }) {
  yield put({ type: SET_AUTHENTICATED_USER, user, authenticated: !!user });
  if (!!user) {
    console.info("[auth state] User is logged in.");
  } else {
    console.info("[auth state] User is logged out.");
  }
}

function* logoutAsync() {
  console.info("Logging out the user...");
  yield firebase_app.auth().signOut();
  yield put({ type: SET_AUTHENTICATED_USER, user: null, authenticated: false });
  console.info("User is now logged out.");
}

export function* watchSessionApp() {
  yield takeLatest(LOG_IN, loginAsync);
  yield takeLatest(LOG_OUT, logoutAsync);
}
