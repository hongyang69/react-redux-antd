import React from "react";
import { Row, Col } from "antd";

const ResponsePanel = ({ mobile, desktop }) => {
  return (
    <Row>
      {mobile && (
        <Col xs={24} sm={0}>
          {mobile}
        </Col>
      )}
      {desktop && (
        <Col xs={0} sm={24}>
          {desktop}
        </Col>
      )}
    </Row>
  );
};

export default ResponsePanel;
