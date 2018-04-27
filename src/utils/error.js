import { goBack, push } from "react-router-redux";
import { Modal } from "antd/lib/index";
import { userLogout } from "../modules/me";

export const UPLOAD_FAILURE_ERROR = "Upload Response";
export const USER_LOGIN_FAILURE = "Login Failure";

export const handleError = (err, dispatch) => {
  console.log("handleError ", err);
  let { message = "", status } = err;
  message = message !== "" ? message : statusToMessage(err.status);
  switch (status) {
    case 400:
    case 404:
      error({
        status,
        message,
        next: async () => {
          await dispatch(goBack());
        }
      });
      return;
    case 401:
      error({
        status,
        message,
        next: userLogout
      });
      return;
    case 403:
    case 409:
    case UPLOAD_FAILURE_ERROR:
    case USER_LOGIN_FAILURE:
      error({
        status,
        message,
        next: async () => {
          if (err.goBack) {
            await dispatch(goBack());
          }
        }
      });
      return;
    default:
      dispatch(push("/error", { message: "error", status: err.status }));
      return;
  }
};

function error({ status, message, next }) {
  Modal.error({
    title: status,
    content: message,
    onOk() {
      next();
    }
  });
}

const statusToMessage = status => {
  switch (status) {
    case 400:
      return "Bad request";
    case 404:
      return "Not found";
    case 401:
      return "Need to login";
    case 403:
      return "Forbidden";
    case 409:
      return "Conflict";
    case UPLOAD_FAILURE_ERROR:
      return "Upload failure";
    case USER_LOGIN_FAILURE:
      return "Username or password incorrect.";
    default:
      return "Error occured";
  }
};

export const createError = (status = 404, message, goBack = false) => {
  return { message, status, goBack };
};
