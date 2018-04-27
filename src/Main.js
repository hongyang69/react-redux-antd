import React from "react";
import App from "./container/App";
import { ConnectedRouter } from "react-router-redux";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import en_US from 'antd/lib/locale-provider/en_US';
import {LocaleProvider} from "antd";


const Main = ({ store, messages, history }) => (
    <IntlProvider messages={messages} locale={'en'}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
              <LocaleProvider locale={en_US}>
                <App />
              </LocaleProvider>
            </ConnectedRouter>
        </Provider>
    </IntlProvider>
);

export default Main;