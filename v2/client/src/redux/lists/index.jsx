import { call, put, takeEvery } from "redux-saga/effects";
import { fetchLists } from "../../api";
import { FETCH_LISTS, SET_LISTS } from "../actionTypes";

function* fetchListsAsync() {
  const listData = yield call(fetchLists);
  yield put({ type: SET_LISTS, lists: listData.lists });
}

export function* watchListsApp() {
  yield takeEvery(FETCH_LISTS, fetchListsAsync);
}
