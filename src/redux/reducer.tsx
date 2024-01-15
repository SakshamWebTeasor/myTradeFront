import { LOGIN_SUCCESS, LOGOUT, SET_USER_DATA } from "./constants";

const initialState: any = [];

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return [...state, action.data];
    case LOGIN_SUCCESS:
      return {
        ...state,
        userLoggedIn: action.payload.user,
        userToken: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        userLoggedIn: null,
        userToken: null,
      };
    default:
      return state;
  }
};
