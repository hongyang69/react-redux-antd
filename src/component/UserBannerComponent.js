import React from "react";
import styled from "styled-components";

//style
import "../container/App.css";
import "antd-mobile/lib/drawer/style/css";

//component
import { Icon, Avatar } from "antd";

import { getUserAvatar } from "../modules/users";

import ResponsePanel from "./common/ResponsePanel";

const LogUser = styled.div`
  float: right;
`;

const CornerIcon = styled(Icon)`
  font-size: 16px;
  margin: 10px;
  vertical-align: middle;
`;

const LogInUsername = styled.span`
  font-size: 16px;
`;

const UserBanner = ({ currentUser, logout }) => (
  <ResponsePanel
    mobile={
      <LogUser>
        <CornerIcon>
          <LogInUsername>{currentUser && currentUser.name}</LogInUsername>
        </CornerIcon>
        <CornerIcon type="logout" onClick={logout} />
      </LogUser>
    }
    desktop={
      <LogUser>
        <CornerIcon type="search" />
        <CornerIcon type="notification" />
        <CornerIcon>
          <Avatar src={getUserAvatar(currentUser)} />
        </CornerIcon>
        <CornerIcon>
          <LogInUsername>{currentUser && currentUser.fullname}</LogInUsername>
        </CornerIcon>
        <CornerIcon type="logout" onClick={logout} />
      </LogUser>
    }
  />
);

export default UserBanner;
