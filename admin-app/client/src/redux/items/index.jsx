import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  FETCH_ITEMS,
  SET_ITEMS,
  DELETE_ITEM,
  CREATE_ITEM,
} from "../actionTypes";

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

function* createItemAsync(action) {
  const {
    uid,
    userDisplayName,
    title,
    description,
    imageUrl,
    url,
    listName,
  } = action;
  const resp = yield call(
    fetch,
    `https://api.goli.st/lists/${listName}/items`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner_uid: uid,
        owner_display_name: userDisplayName,
        title: title,
        description: description,
        link: url,
        image_url: imageUrl,
      }),
    }
  );
  const { err, ok } = yield resp.json();
  if (ok) {
    toast.success(`New Link successfully added to goli.st/${listName}`);
    yield put({ type: FETCH_ITEMS, listName }); // refresh the items
  } else {
    console.error(err);
    toast.error("Failed to add a new list item");
  }
}

export function* watchItemsApp() {
  yield takeLatest(FETCH_ITEMS, fetchItemsAsync);
  yield takeLatest(DELETE_ITEM, deleteItemAsync);
  yield takeLatest(CREATE_ITEM, createItemAsync);
}
