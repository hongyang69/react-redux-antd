import { connect } from "react-redux";
import { push } from "react-router-redux";

import { switchMenuCollapsed } from "../modules/ui";
import MainComponent from "../component/MainComponent";
import Form from "antd/es/form/Form";

const mapStateToProps = state => {
  return {
    currentUser: state.me.currentUser,
    menuCollapsed: state.ui.menuCollapsed,
    loading: state.ui.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchMenuCollapsed: () => dispatch(switchMenuCollapsed()),
    linkTo: url => dispatch(push(url))
  };
};

const MainContainer = Form.create()(
  connect(mapStateToProps, mapDispatchToProps)(MainComponent)
);

export default MainContainer;
