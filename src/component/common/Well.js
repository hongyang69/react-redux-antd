import React from "react";
import { List } from "antd";
import styled from "styled-components";

const Container = styled.div`
  margin-top: ${props => props.marginTop}px;
`

const Panel = styled(List)`
  background-color: #fff;
  .ant-list-item {
    display: block;
    padding: 10px;
    border-bottom: none;
    align-items: flex-end;
    .ant-list-item-content {
      color: #00000073;
      margin: 15px 20px;
      display: block;
    }
  }
  .ant-list-item:last-child {
    border-bottom: none;
  }
  .ant-list-pagination {
    margin-top: 0;
    padding: 15px;
    background-color: #f0f2f5;
  }
  .ant-list-header {
    border-bottom: none;
    background-color: #99bde4;
    color: white;
  }
  .ant-menu-horizontal {
    border-bottom: none;
  }
`;

const Loading = styled.div`
  height: 20px;
`;
const Well = ({ loading, showChildren = false, marginTop = 10, children }) => {
  return (
    <Container marginTop={marginTop}>
      <Panel
        itemLayout="horizontal"
        loading={loading}
        dataSource={[1]}
        renderItem={i => (
          <List.Item>{loading ? (showChildren ? children : <Loading />) : children}</List.Item>
        )}
      />
    </Container>
  );
};

export default Well;
