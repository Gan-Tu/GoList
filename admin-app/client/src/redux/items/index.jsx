import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { FETCH_ITEMS, SET_ITEMS, DELETE_ITEM } from "../actionTypes";

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

function* deleteItemAsync({ itemId, listName }) {
  const resp = yield call(
    fetch,
    `https://api.goli.st/lists/${listName}/items/${itemId}`,
    {
      method: "DELETE",
    }
  );
  const { err, ok } = yield resp.json();
  if (ok) {
    yield put({ type: FETCH_ITEMS, listName });
  } else {
    console.error(err);
    toast.error("Failed to delete list items");
  }
}

export function* watchItemsApp() {
  yield takeLatest(FETCH_ITEMS, fetchItemsAsync);
  yield takeLatest(DELETE_ITEM, deleteItemAsync);
}
