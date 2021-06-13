import { SET_LIST_METADATA } from "../actionTypes";

const initial_state = {
  metadata: null,
};

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case SET_LIST_METADATA:
      return { metadata: action.metadata };
    default:
      return { ...state };
  }
}
