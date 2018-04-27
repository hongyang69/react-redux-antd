import { push } from "react-router-redux";
import { mockRequest, requestWrapper } from "./ui";
import { AvatarIcon } from "../component/common/Icons";
import { request } from "../utils/requestUtils";
import { message } from "antd";
import { getMockUser, getMockUsers } from "../utils/sampleData/sampleData";

const FETCH_USERS = "react/app/users/fetch";
const FETCHED_USERS = "react/app/users/fetched";
const UPSET_USER = "react/app/appnce/users/upset";
const DESELECT_USER = "react/app/users/deselect";
const SAVED_USER = "react/app/users/saved";

const max = 10;

export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_STAFF = "ROLE_STAFF";
export const ROLE_MANAGER = "ROLE_MANAGER";

export const initialUser = {
  name: "",
  fullname: "",
  password: "",
  phone: "",
  email: "@gmail.com",
  photo: {
    url: null
  },
  roles: ["ROLE_STAFF"]
};

const initialState = {
  users: null,
  offset: 0,
  max,
  total: 0,
  edit: false,
  selected: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        offset: action.payload.offset
      };
    case FETCHED_USERS:
      return {
        ...state,
        users: action.payload.users,
        total: action.payload.total,
        offset: action.payload.offset
      };
    case SAVED_USER:
      return {
        ...state,
        edit: false
      };
    case UPSET_USER:
      return {
        ...state,
        selected: action.payload.user,
        edit: action.payload.edit
      };
    case DESELECT_USER:
      return {
        ...state,
        selected: initialUser,
        edit: false
      };
    default:
      return state;
  }
}

function fetchedUsers(args) {
  return { type: FETCHED_USERS, payload: args };
}

export function upsetUser({ match }) {
  return requestWrapper(async function(dispatch, state) {
    dispatch({ type: DESELECT_USER });
    let user = {};
    let edit = true;
    if (match.params.id === "add") {
      user = initialUser;
    } else {
      const id = match.params.id;
      // user = await getUser({ id });
      getMockUser(id);
      user = await mockRequest(getMockUser(id));
    }
    dispatch({ type: UPSET_USER, payload: { user, edit } });
  });
}

export function saveUser(user) {
  return requestWrapper(async function(dispatch, state) {
    // const response = user.id ? await updateUser(user) : await signup(user);
    const response = await mockRequest({ ok: true, user });
    if (response.ok) {
      message.success("User saved successful");
      dispatch(push("/users"));
    }
  });
}

export function fetchUsers({ offset = 0 }) {
  return requestWrapper(async function(dispatch, state) {
    dispatch({ type: FETCH_USERS, payload: { offset } });
    // const results = await getUsers({ offset, max });
    const results = await mockRequest(getMockUsers({ offset, max }));
    dispatch(fetchedUsers(results));
  });
}

export function deleteUser(id) {
  return requestWrapper(async function(dispatch, state) {
    // const response = await removeUser(name);
    const response = await mockRequest({ ok: true, id });
    if (response.ok) {
      message.success("User deleted successful");
      dispatch(push("/users"));
    }
  });
}

export const getUserAvatar = (user = {}) => {
  const { photo = { url: null } } = user;
  const { url } = photo;
  return url || AvatarIcon;
};

export const checkUserSession = () => {
  throw Error("no user session");
};

const getUsers = args => request({ url: `users`, method: "GET", args });

const getUser = args => request({ url: `user`, method: "GET", args });

const removeUser = args =>
  request({ url: `user/delete`, method: "POST", args });

const updateUser = args =>
  request({ url: `user/update`, method: "POST", args });

const signup = args => request({ url: `user/new`, method: "POST", args });
