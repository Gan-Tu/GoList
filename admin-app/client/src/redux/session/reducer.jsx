import { SET_AUTHENTICATED_USER } from "../actionTypes";

const initial_state = {
  authenticated: false,
  user: null, // should be firebase user
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case SET_AUTHENTICATED_USER:
      return {
        authenticated: action.authenticated,
        user: action.user
          ? {
              displayName: action.user?.displayName,
              email: action.user?.email,
              photoURL: action.user?.photoURL,
              emailVerified: action.user?.emailVerified,
              uid: action.user?.uid,
            }
          : null,
      };
    default:
      return { ...state };
  }
}
