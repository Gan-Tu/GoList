import { LOG_IN, LOG_OUT, SET_USER } from "../actionTypes";

const initial_state = {
  is_authenticated: false,
  user: {
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
    emailVerified: null,
  }, // should be firebase user
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case LOG_OUT:
      return initial_state;
    case LOG_IN:
      return {...state, is_authenticated: true};
    case SET_USER:
      return {
        ...state,
        user: {
          displayName: action.user?.displayName,
          email: action.user?.email,
          photoURL: action.user?.photoURL,
          emailVerified: action.user?.emailVerified,
          uid: action.user?.uid,
        },
      };
    default:
      return { ...state };
  }
}
