import React from "react";
import store from "../../store";
import * as _ from "lodash";

/**
 * HOC component for wrapping a base component.
 * @param callback
 */
const dispatchOnEnter = callback => BaseComponent => {
  const routeOnEnterCallback = props => {
    if (callback && typeof callback === "function") {
      store.dispatch(callback(props));
    } else if (callback && Array.isArray(callback)) {
      _.each(callback, c => store.dispatch(c(props)));
    } else {
      console.error("callback is not a function");
    }
  };

  class routeOnEnterComponent extends React.Component {
    componentWillMount() {
      routeOnEnterCallback(this.props);
    }

    componentWillReceiveProps(nextProps) {
      // not 100% sure about using `locatoin.key` to distinguish between routes
      if (nextProps.location.key !== this.props.location.key) {
        routeOnEnterCallback(nextProps);
      }
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return routeOnEnterComponent;
};

export default dispatchOnEnter;
