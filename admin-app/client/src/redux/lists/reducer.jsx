import { SET_LISTS } from "../actionTypes";

const initial_state = {
  lists: [],
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case SET_LISTS:
      return { lists: action.lists };
    default:
      return { ...state };
  }
}
