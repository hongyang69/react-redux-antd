import React from "react";
import store, { history } from "./store";
import registerServiceWorker from "./utils/registerServiceWorker";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import messages from "./i18n/en";
import "whatwg-fetch";
import ReactDOM from "react-dom";
import Main from "./Main";
import { checkUserSession } from "./modules/users";

addLocaleData(en);

(async function() {
  try {
    await checkUserSession();
  } catch (err) {
    console.log("user login status: ", err);
  }
  const page = <Main history={history} messages={messages} store={store} />;
  const target = document.getElementById("root");
  target.style.setProperty("width", "100%");
  target.style.setProperty("height", "100%");
  ReactDOM.render(page, target);
  if (module.hot) {
    module.hot.accept("./Main", () => {
      ReactDOM.render(page, document.getElementById("root"));
    });
  }
  registerServiceWorker();
})();
