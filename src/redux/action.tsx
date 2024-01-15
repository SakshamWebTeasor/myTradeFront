import { User } from "../Interface";
import {
  USER_LIST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./constants";

export const loginSuccess = (user: User, token: string) => ({
  type: LOGIN_SUCCESS,
  payload: {user, token},
});

export const logout = () => ({
  type: LOGOUT,
});

export function getUserList() {
  return {
    type: USER_LIST,
  };
}