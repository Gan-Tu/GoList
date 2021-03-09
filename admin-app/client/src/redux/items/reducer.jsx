import { SET_ITEMS } from "../actionTypes";

const initial_state = {
  items: [],
};

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case SET_ITEMS:
      return { items: action.items };
    default:
      return { ...state };
  }
}
