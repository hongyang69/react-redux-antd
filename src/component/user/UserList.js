import React from "react";
import { Avatar, Button, List, Icon, Modal } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getUserAvatar } from "../../modules/users";

const Header = styled.div`
  padding: 0 0 15px 15px;
  text-align: left;
`;

const PhoneNumber = styled.div`
  padding: 0 10px;
  width: 130px;
`;

const Role = styled.div`
  padding: 0 10px;
`;

const UList = styled(List)`
  background-color: #fff;
  @media (max-width: 576px) {
    margin: 0px;
  }
  .ant-list-item {
    padding: 10px;
    .ant-list-item-content {
      justify-content: left;
    }
  }
  .ant-list-item:hover {
    background-color: #f0f8fa;
  }
  .ant-list-pagination {
    margin-top: 0;
    padding: 15px;
    background-color: #f0f2f5;
  }
`;

function deleteUserConfirm({ name, deleteUser }) {
  Modal.confirm({
    title: "Confirm Deletion",
    content: "Sure to delete user : " + name + " ?",
    onOk() {
      return deleteUser(name);
    },
    onCancel() {}
  });
}

class UserList extends React.Component {
  render() {
    const { max, offset, total, users, loading } = this.props;
    const pagination = {
      pageSize: max,
      current: offset / max + 1,
      total,
      showQuickJumper: true,
      hideOnSinglePage: true,
      onChange: (page, max) => {
        this.props.fetchUsers((page - 1) * max);
      }
    };
    return (
      <div>
        <Header>
          <Link to="/user/add">
            <Button type="primary" icon="plus">
              Add
            </Button>
          </Link>
        </Header>
        <UList
          loading={loading}
          pagination={pagination}
          itemLayout="horizontal"
          dataSource={users || []}
          renderItem={user => (
            <List.Item
              actions={[
                <Link to={"/user/" + user.id}>
                  <Icon type="edit" />
                </Link>,
                <a
                  onClick={() => {
                    deleteUserConfirm({
                      name: user.fullname,
                      deleteUser: this.props.deleteUser
                    });
                  }}
                >
                  <Icon type="delete" />
                </a>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={getUserAvatar(user)} />}
                title={user.name}
                description={user.email}
              />
              <PhoneNumber>{user.phoneNumber}</PhoneNumber>
              <Role>{user.role}</Role>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default UserList;
