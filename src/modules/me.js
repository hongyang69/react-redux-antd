import { createError, USER_LOGIN_FAILURE } from "../utils/error";
import { mockRequest, requestWrapper } from "./ui";
import { request } from "../utils/requestUtils";
import { mockUserLogin } from "../utils/sampleData/sampleData";
import { push } from "react-router-redux";

const LOGIN_SUCCESS = "react/app/me/login/success";
const LOGOUT = "react/app/me/logout";

const initialState = {
  currentUser: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
}

export function loginSuccess(currentUser) {
  return { type: LOGIN_SUCCESS, payload: currentUser };
}

export function userLogin({ username, password }) {
  return requestWrapper(async function(dispatch, state) {
    try {
      // const response = await loginRequest(username, password);
      const response = await mockRequest(mockUserLogin({ username, password }));
      console.log("login response", response);
      if (response) {
        dispatch(loginSuccess(response));
      } else {
        throw Error("no user login failure");
      }
    } catch (err) {
      console.log("login error : ", err);
      throw createError(USER_LOGIN_FAILURE, "");
    }
  });
}

export function userLogout() {
  return requestWrapper(async function(dispatch, state) {
    dispatch(logout());
    dispatch(push("/"));
  });
}

export function logout() {
  return { type: LOGOUT };
}

const loginRequest = async (username, password) => {
  const args = { username, password };
  const method = "POST";
  const url = "login/authenticate?ajax=true";
  return await request({ args, method, url }).then(json => {
    if (json.success) {
      return json;
    }
    throw new Error("not found");
  });
};
