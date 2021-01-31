import {
  SET_SHORT_URL,
  SET_LONG_URL_BY_INDEX,
  APPEND_LONG_URLS,
  REMOVE_LONG_URL_BY_INDEX,
  SAVE_URL_METADATA,
} from "../actions/ActionTypes";

const initialState = {
  short_url: null,
  long_urls: [],
  url_metadata: {},
};

export default function urlReducer(state = initialState, action) {
  let new_urls = state.long_urls.slice();
  let new_url_metadata = { ...state.url_metadata };
  switch (action.type) {
    case SET_SHORT_URL:
      return {
        ...state,
        short_url: action.payload.short_url,
      };
    case SET_LONG_URL_BY_INDEX:
      new_urls = state.long_urls.slice();
      new_urls[action.payload.idx] = action.payload.url;
      return {
        ...state,
        long_urls: new_urls,
      };
    case APPEND_LONG_URLS:
      return {
        ...state,
        long_urls: [...state.long_urls, ...action.payload.urls],
      };
    case REMOVE_LONG_URL_BY_INDEX:
      new_urls = state.long_urls.slice();
      new_urls.splice(action.payload.idx, 1);
      return {
        ...state,
        long_urls: new_urls,
      };
    case SAVE_URL_METADATA:
      new_url_metadata[action.payload.url] = action.payload.url_metadata;
      return {
        ...state,
        url_metadata: {...new_url_metadata},
      };
    default:
      return state;
  }
}
