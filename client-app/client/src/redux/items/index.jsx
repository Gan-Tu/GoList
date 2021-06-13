import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { FETCH_ITEMS, SET_ITEMS } from "../actionTypes";

function* fetchItemsAsync({ listName }) {
  const resp = yield call(fetch, `https://api.goli.st/lists/${listName}/items`);
  const { err, ok, entities } = yield resp.json();
  if (ok) {
    yield put({ type: SET_ITEMS, items: entities });
  } else {
    console.error(err);
    toast.error("Failed to get list items");
  }
}

export function* watchItemsApp() {
  yield takeLatest(FETCH_ITEMS, fetchItemsAsync);
}
