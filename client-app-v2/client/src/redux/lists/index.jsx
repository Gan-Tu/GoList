import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_LIST_METADATA, SET_LIST_METADATA } from "../actionTypes";

function* fetchListMetadataAsync({ listName }) {
  const resp = yield call(fetch, `https://api.goli.st/lists/${listName}`);
  var metadata = yield resp.json();
  if (!metadata.err) {
    yield put({ type: SET_LIST_METADATA, metadata });
  } else {
    console.error(metadata.err);
  }
}

export function* watchListsApp() {
  yield takeLatest(FETCH_LIST_METADATA, fetchListMetadataAsync);
}
