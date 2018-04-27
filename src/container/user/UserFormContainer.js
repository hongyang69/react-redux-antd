import { Form } from "antd";
import { saveUser } from "../../modules/users";
import { connect } from "react-redux";
import UserForm from "../../component/user/UserForm";

const mapStateToProps = (state, props) => {
  return {
    user: state.users.selected || props.user,
    edit: state.users.edit,
    loading: state.ui.loading
  };
};

const mapDispatchToProps = dispatch => {
  return { saveUser: user => dispatch(saveUser(user)) };
};

// const UserFormContainer = Form.create()(
//   connect(mapStateToProps, mapDispatchToProps)(UserForm)
// );

export default Form.create()(
    connect(mapStateToProps, mapDispatchToProps)(UserForm)
);
