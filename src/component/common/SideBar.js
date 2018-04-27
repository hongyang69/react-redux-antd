import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//component
import { Layout, Menu, Icon } from "antd";

//Icon
import BarChart from "react-icons/lib/fa/bar-chart";
import Stethoscope from "react-icons/lib/fa/stethoscope";

import { connect } from "react-redux";
import _ from "lodash";
import { ROLE_ADMIN, ROLE_STAFF, ROLE_MANAGER } from "../../modules/users";

const { Sider } = Layout;

const IconName = styled.span`
  margin-left: 10px;
`;

const SIDER_BAR = [
  {
    key: "1",
    enable: true,
    link: "/",
    roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_STAFF],
    content: (
      <span>
        <BarChart />
        <IconName>{"Home page"}</IconName>
      </span>
    )
  },

  {
    key: "2",
    enable: true,
    link: "/users",
    roles: [
      ROLE_ADMIN
      // ROLE_STAFF
    ],
    content: (
      <span>
        <Icon type="user" />
        {"users"}
      </span>
    )
  },

  {
    key: "3",
    enable: true,
    link: "/staff",
    roles: [ROLE_STAFF],
    content: (
      <span>
        <Icon type="hdd" />
        {"staff"}
      </span>
    )
  },

  {
    key: "4",
    enable: true,
    link: "/manager",
    roles: [ROLE_MANAGER],
    content: (
      <span>
        <Stethoscope />
        <IconName>{"manager"}</IconName>
      </span>
    )
  }
];

const LeftSider = styled(Sider)`
  background-color: #fff;
  text-align: left;
`;

const sideBarStateToProps = state => {
  return { ...state.routing, ...state.me };
};

const sideBarDispatchToProps = dispatch => {
  return {};
};

const SideBar = ({ location, currentUser, header }) => {
  const pathname = location.pathname;
  let defaultSelectedKey = "1";
  if (pathname.startsWith("/manager")) {
    defaultSelectedKey = "4";
  } else if (pathname.startsWith("/staff")) {
    defaultSelectedKey = "3";
  } else if (pathname.startsWith("/users")) {
    defaultSelectedKey = "2";
  } else if (pathname.startsWith("/")) {
    defaultSelectedKey = "1";
  } else {
    defaultSelectedKey = "0";
  }
  let authorizedSideBar = [];
  _.each(SIDER_BAR, sideBar => {
    if (
      sideBar.enable &&
      _.intersection(currentUser.roles, sideBar.roles).length > 0
    ) {
      authorizedSideBar.push(sideBar);
    }
  });
  return (
    <LeftSider width={200}>
      {header}
      <Menu
        mode="inline"
        defaultSelectedKeys={[defaultSelectedKey]}
        selectedKeys={[defaultSelectedKey]}
        defaultOpenKeys={[defaultSelectedKey]}
        openKeys={[defaultSelectedKey]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {authorizedSideBar.map(navigator => {
          return (
            <Menu.Item key={navigator.key}>
              <Link to={navigator.link}>{navigator.content}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </LeftSider>
  );
};

export default connect(sideBarStateToProps, sideBarDispatchToProps)(SideBar);
