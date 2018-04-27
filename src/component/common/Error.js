import React from "react";
import styled from "styled-components";

//component
import { Icon } from "antd";

const ErrorPanel = styled.div`
  margin: 50px;
`;

const Error = ({ location, match }) => {
  let message = "The requested URL was not found on this server.";
  if (location.state && location.state.message) {
    message = location.state.message;
  }
  return (
    <ErrorPanel>
      <h1>
        <Icon
          style={{ color: "red", paddingRight: "5px", fontWeight: 700 }}
          type="exclamation-circle-o"
        />
        {"  404. That’s an error."}
      </h1>
      <p>{message}</p>
    </ErrorPanel>
  );
};

export default Error;
