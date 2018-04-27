import { connect } from "react-redux";
import UserBannerComponent from "../component/UserBannerComponent";
import { userLogout } from "../modules/me";

const userStateToProps = state => {
  return state.me;
};

const userDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(userLogout())
  };
};

const UserBanner = connect(userStateToProps, userDispatchToProps)(
  UserBannerComponent
);

export default UserBanner;
