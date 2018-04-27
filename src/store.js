import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import rootReducer from "./modules/index";
import logger from "redux-logger";

export const history = createHistory();

const initialState = window.INITIAL_STATE || {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
  store => next => action => {
    // console.log("store", store);
    // console.log("next", next, a);
    // console.log("action", action);
    return next(action);
  }
];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
  middleware.push(logger);
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

let createStoreFunc = createStore;

const store = createStoreFunc(rootReducer, initialState, composedEnhancers);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./modules/index", () => {
      store.replaceReducer(rootReducer);
    });
  }
}

export default store;
