import { call, put, takeEvery } from "redux-saga/effects";
import { fetchLists } from "../../api";
import { FETCH_LISTS, SET_LISTS } from "../actionTypes";

function* fetchListsAsync({uid}) {
  const listData = yield call(fetchLists, uid);
  yield put({ type: SET_LISTS, lists: listData.lists });
}

export function* watchListsApp() {
  yield takeEvery(FETCH_LISTS, fetchListsAsync);
}
