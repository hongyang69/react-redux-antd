import _ from "lodash";
import { createError } from "./error";
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const toFormData = args => {
  const data = new FormData();
  _.each(_.keys(args), k => {
    if (args[k]) {
      data.append(k, args[k]);
    }
  });
  return data;
};

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if (response.redirected && response.url.indexOf("/login/auth") > -1) {
      throw createError(401, "");
    }
    return response;
  } else {
    throw response;
  }
}

export function parseJSON(response) {
  try {
    const json = response.json();
    return json;
  } catch (err) {
    console.log("parse JSON error", err);
    return response;
  }
}

export const request = ({ args, method, url }) => {
  return fetch(`${SERVER_URL}/${url}`, {
    method,
    body: args ? toFormData(args) : null,
    credentials: "include"
  })
    .then(checkStatus)
    .then(parseJSON);
};
