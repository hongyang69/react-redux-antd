import React, { Component } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import _ from "lodash";

//style
import "../container/App.css";
import "antd-mobile/lib/drawer/style/css";

//component
import { Layout, Icon, Avatar, Row, Col } from "antd";
import UserBannerContainer from "../container/UserBannerContainer";
import UserListContainer from "../container/user/UserListContainer";
import UserFormContainer from "../container/user/UserFormContainer";
import Error from "./common/Error";

//Icon
import { LOGO } from "../component/common/Icons";

import dispatchOnEnter from "../container/common/dispatchOnEnter";
import {
  fetchUsers,
  upsetUser,
  ROLE_ADMIN,
  ROLE_STAFF,
  ROLE_MANAGER
} from "../modules/users";
import SideBar from "../component/common/SideBar";

import Login from "../Login";
import { Drawer } from "antd-mobile";
import ResponsePanel from "./common/ResponsePanel";
import Loading from "./common/Loading";

const { Header, Content } = Layout;

const Logo = styled.div`
  width: 200px;
  height: 65px;
  justify-content: center;
  align-items: center;
  background-color: #76a6ef;
  display: flex;
  .ant-avatar-image {
    height: 64px;
    width: 90px;
  }
`;

const CollapsedMenu = styled.div`
  width: 50px;
  height: 100%;
  text-align: center;
  background-color: #76a6ef;
`;

const HeaderContainer = styled(Header)`
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 576px) {
    height: 50px;
    line-height: 50px;
    position: fixed;
    z-index: 5;
    width: 100%;
    .header {
      height: 50px;
    }
  }
`;

const ContentContainer = styled(Layout)`
  @media (max-width: 576px) {
    margin-top: 50px;
  }
`;

const MainContainer = styled(Layout)`
  padding: 0 0 24px;
`;

const DrawerCol = styled(Col)`
  position: fixed;
  .my-drawer {
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    min-height: ${props => props.height - 65}px !important;
    .am-drawer-sidebar {
      background-color: #fff;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      z-index: 3;
    }
    .am-drawer-overlay {
      z-index: 2;
    }
    a {
      text-decoration: none;
    }
  }
`;

const MainRow = styled(Row)`
  width: 100%;
`;

const MainContent = styled(Content)`
  padding: 20px;
  margin: 0;
  min-height: ${() => document.documentElement.clientHeight - 65 - 24}px;
  @media (max-width: 576px) {
    padding: 10px 5px;
  }
`;

const MainPage = () => {
  return <div>{"home page"}</div>;
};

const StaffPage = () => {
  return <div>{"Staff Page"}</div>;
};
const ManagerPage = () => {
  return <div>{"Manager Page"}</div>;
};

const pages = [
  {
    page: <Route key="staff-page" exact path="/staff" component={StaffPage} />,
    roles: [
      // ROLE_ADMIN,
      // ROLE_MANAGER,
      ROLE_STAFF
    ]
  },
  {
    page: (
      <Route key="manager-page" exact path="/manager" component={ManagerPage} />
    ),
    roles: [
      // ROLE_ADMIN,
      ROLE_MANAGER
      // ROLE_STAFF
    ]
  },
  {
    page: (
      <Route
        key="users"
        exact
        path="/users"
        component={dispatchOnEnter(fetchUsers)(UserListContainer)}
      />
    ),
    roles: [
      ROLE_ADMIN
      // ROLE_MANAGER,
      // ROLE_STAFF
    ]
  },
  {
    page: (
      <Route
        key="user_detials"
        exact
        path="/user/:id"
        component={dispatchOnEnter(upsetUser)(UserFormContainer)}
      />
    ),
    roles: [
      ROLE_ADMIN
      // ROLE_MANAGER,
      // ROLE_STAFF
    ]
  }
];

class MainComponent extends Component {
  componentDidMount() {
    const currentUser = this.props.currentUser;
    if (currentUser) {
      if (window.location.pathname === "/") {
        //user default link
        this.props.linkTo("/");
      }
    }
  }
  render() {
    const { currentUser, loading } = this.props;
    let authorizedPages = [];
    if (currentUser) {
      const roles = currentUser.roles;
      _.each(pages, page => {
        if (_.intersection(roles, page.roles).length > 0) {
          authorizedPages.push(page.page);
        }
      });
    } else {
      return (
        <Loading loading={loading}>
          <Login />
        </Loading>
      );
    }
    const height = document.documentElement.clientHeight;
    const mainPage = (
      <Route key={"main_page"} exact path="/" component={MainPage} />
    );
    const logo = (
      <Link to={"/"}>
        <Logo>
          <Avatar shape={"square"}>{"PRB"}</Avatar>
        </Logo>
      </Link>
    );
    return (
      <Layout>
        <ResponsePanel desktop={<SideBar header={logo} />} />
        <Layout>
          <HeaderContainer>
            <div className="header">
              <ResponsePanel
                mobile={
                  <CollapsedMenu
                    style={{ cursor: "pointer" }}
                    onClick={this.props.switchMenuCollapsed}
                  >
                    <Icon
                      type={
                        this.props.menuCollapsed ? "menu-fold" : "menu-unfold"
                      }
                      style={{
                        verticalAlign: "middle",
                        fontSize: 26,
                        color: "white",
                        backgroundColor: "#76a6ef"
                      }}
                    />
                  </CollapsedMenu>
                }
              />
              <UserBannerContainer />
            </div>
          </HeaderContainer>
          <ContentContainer>
            <MainRow>
              <DrawerCol
                xs={12}
                sm={0}
                style={{
                  width: "100%",
                  zIndex: this.props.menuCollapsed ? 3 : 0
                }}
              >
                <Drawer
                  className="my-drawer"
                  style={{ minHeight: height }}
                  enableDragHandle
                  sidebar={<SideBar />}
                  open={this.props.menuCollapsed}
                  onOpenChange={() => {
                    this.props.switchMenuCollapsed();
                  }}
                >
                  <span />
                </Drawer>
              </DrawerCol>
              <Loading loading={loading}>
                <MainContainer>
                  <MainContent>
                    <Switch>
                      {mainPage}
                      {authorizedPages}
                      <Route exact path="/error" component={Error} />
                      <Route path="/:error" component={Error} />
                    </Switch>
                  </MainContent>
                </MainContainer>
              </Loading>
            </MainRow>
          </ContentContainer>
        </Layout>
      </Layout>
    );
  }
}

export default MainComponent;
