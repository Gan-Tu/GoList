import { call, put, takeLatest } from "redux-saga/effects";
import { fetchLists } from "../../api";
import {
  FETCH_LISTS,
  SET_LISTS,
  CREATE_LIST,
  DELETE_LIST,
} from "../actionTypes";
import { toast } from "react-toastify";

function* fetchListsAsync({ uid }) {
  const listData = yield call(fetchLists, uid);
  yield put({ type: SET_LISTS, lists: listData.lists });
}

function* createNewListAsync({
  name,
  title,
  description,
  uid,
  userDisplayName,
}) {
  const { err, ok } = yield call(fetch, `https://api.goli.st/golists/${name}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      owner_uid: uid,
      owner_display_name: userDisplayName,
      title: title,
      description: description,
    }),
  });
  if (ok) {
    toast.success("New GoList successfully created.");
    yield put({ type: FETCH_LISTS, uid }); // refresh the lists
  } else {
    console.error(err);
    toast.error("Failed to create the list");
  }
}

function* deleteListAsync({ name, uid }) {
  const { err, ok } = yield call(fetch, `https://api.goli.st/golists/${name}`, {
    method: "delete",
  });
  if (ok) {
    toast.info("GoList successfully deleted.");
    yield put({ type: FETCH_LISTS, uid }); // refresh the lists
  } else {
    console.error(err);
    toast.error("Failed to delete the list");
  }
}

export function* watchListsApp() {
  yield takeLatest(FETCH_LISTS, fetchListsAsync);
  yield takeLatest(CREATE_LIST, createNewListAsync);
  yield takeLatest(DELETE_LIST, deleteListAsync);
}
