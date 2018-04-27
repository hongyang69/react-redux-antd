import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../../modules/users";
import UserList from "../../component/user/UserList";

const mapStateToProps = state => {
  return {...state.users, loading: state.ui.loading};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: offset => dispatch(fetchUsers({ offset })),
    deleteUser: name => dispatch(deleteUser(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
