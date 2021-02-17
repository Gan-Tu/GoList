import { call, put, takeEvery } from "redux-saga/effects";
import { fetchItems } from "../../api";
import { FETCH_ITEMS, SET_ITEMS } from "../actionTypes";

function* fetchItemsAsync() {
  const items = yield call(fetchItems);
  yield put({ type: SET_ITEMS, items: items.data });
}

export function* watchItemsApp() {
  yield takeEvery(FETCH_ITEMS, fetchItemsAsync);
}
