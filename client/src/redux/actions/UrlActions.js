import {
  SET_SHORT_URL,
  SET_LONG_URL_BY_INDEX,
  APPEND_LONG_URLS,
  REMOVE_LONG_URL_BY_INDEX,
  SAVE_URL_METADATA,
} from "./ActionTypes";

export const setShortUrl = (short_url) => (dispatch) => {
  dispatch({
    type: SET_SHORT_URL,
    payload: { short_url },
  });
};

export const setLongUrlByIndex = (idx, url) => (dispatch) => {
  dispatch({
    type: SET_LONG_URL_BY_INDEX,
    payload: { idx, url },
  });
};

export const appendLongUrl = (url) => (dispatch) => {
  dispatch({
    type: APPEND_LONG_URLS,
    payload: { urls: [url] },
  });
};

export const appendLongUrls = (urls) => (dispatch) => {
  dispatch({
    type: APPEND_LONG_URLS,
    payload: { urls },
  });
};

export const removeLongUrlByIndex = (idx) => (dispatch) => {
  dispatch({
    type: REMOVE_LONG_URL_BY_INDEX,
    payload: { idx },
  });
};

export const submitUrlMapping = (short_url, long_urls) => (dispatch) => {
  fetch(`/api/urls/save/${short_url}`, {
    method: "POST",
    body: JSON.stringify({ long_urls }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        let resp_json = res.json();
        if (resp_json.err) {
          alert(`See err: ${resp_json.err}`);
          console.error(`Submit error encountered: ${resp_json}`);
        } else {
          alert(`Visit at goli.st/${short_url}`);
        }
      } else {
        alert(`Failed to submit due to: ${res.statusText}`);
        console.error("Submit error encountered: ", res);
      }
    })
    .catch((err) => console.error(err));
};

export const getUrlMetadata = (url) => (dispatch) => {
  fetch(`/api/urls/fetchMetadata/${encodeURIComponent(url).replace(/https?/g, "http")}`)
    .then((res) => res.json())
    .then((url_metadata) =>
      dispatch({
        type: SAVE_URL_METADATA,
        payload: { url, url_metadata },
      })
    )
    .catch((err) => console.error(err));
};

export const getLongUrlsByShortUrl = (url) => (dispatch) => {
  fetch(`/api/urls/get/${url}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.err) {
        console.error(res.err);
        alert(res.err);
      } else {
        dispatch({
          type: APPEND_LONG_URLS,
          payload: { urls: res.long_urls },
        });
      }
    })
    .catch((err) => console.error(err));
};
