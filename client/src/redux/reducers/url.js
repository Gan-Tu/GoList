import {
  SET_SHORT_URL,
  SET_LONG_URL_BY_INDEX,
  APPEND_LONG_URL,
  REMOVE_LONG_URL_BY_INDEX,
} from "../actions/ActionTypes";

const initialState = {
  short_url: null,
  long_urls: [],
};

export default function urlReducer(state = initialState, action) {
  let new_urls = state.long_urls.slice();
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
    case APPEND_LONG_URL:
      return {
        ...state,
        long_urls: [...state.long_urls, action.payload.url],
      };
    case REMOVE_LONG_URL_BY_INDEX:
      new_urls = state.long_urls.slice();
      new_urls.splice(action.payload.idx, 1);
      return {
        ...state,
        long_urls: new_urls,
      };
    default:
      return state;
  }
}
