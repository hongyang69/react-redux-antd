import React from "react";
import styled from "styled-components";
import { Row, Col, Input, Button, Avatar, Icon } from "antd";
import logo from "./images/logo.svg";

//style
import "./container/App.css";

//Icon
import { Form } from "antd/lib/index";
import { connect } from "react-redux";
import { userLogin } from "./modules/me";

const Page = styled.div`
  background-image: url(${require("./images/bg_image.jpg")});
  background-repeat: no-repeat;
  background-size: auto;
  width: 100%;
  height: 100%;
  background-position: center;
  .container {
    height: 100%;
  }
  .ant-btn-primary {
    // background-color: #6791d1;
  }
  @media (max-width: 576px) {
    min-height: ${() => document.documentElement.clientHeight}px;
  }
`;

const ContentRow = styled(Row)`
  padding-top: 10%;
  height: 97%;
`;

const FormItem = Form.Item;

const FormContainer = styled.div`
  margin-top: 20px;
  height: 100%;
  .ant-form-item-control {
    text-align: left;
  }
`;
const FormHeader = styled.div`
  margin: 10px;
  text-align: center;
  h1,
  h3 {
    color: #fff;
  }
  h3 {
    .by {
      vertical-align: text-top;
    }
    .ant-avatar-image {
      width: 90px;
      height: 90px;
    }
  }
`;
const LoginButton = styled(Button)`
  text-align: center;
  width: 100%;
`;
const Password = styled(FormItem)`
  margin-bottom: 0;
`;
const Forget = styled(FormItem)`
  .ant-form-item-control {
    text-align: right;
    line-height: 25px;
  }
  .forgot {
    color: #6791d1;
  }
`;
const Footer = styled(FormItem)`
  margin-top: 100px;
  position: absolute;
  width: 100%;
  bottom: 10%;
`;
const FooterTitle = styled(Col)`
  text-align: center;
  > a {
    color: #6791d1;
  }
`;

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12, offset: 6 }
      }
    };
    const forgetLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12, offset: 6 }
      }
    };
    const iconStyle = { color: "#c0c0c0" };
    const userNameIcon = <Icon type="user" style={iconStyle} />;
    const passwordIcon = <Icon type="lock" style={iconStyle} />;
    return (
      <FormContainer>
        <FormHeader>
          <h1>React Redux Platform</h1>
          <h3>
            <span className={"by"}>by</span> <Avatar src={logo} />
          </h3>
        </FormHeader>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input login name"
                }
              ]
            })(
              <Input
                placeholder="Enter your username"
                prefix={userNameIcon}
                size="large"
                suffix={
                  getFieldValue("username") ? (
                    <Icon
                      type="close-circle"
                      onClick={() => setFieldsValue({ username: null })}
                    />
                  ) : null
                }
              />
            )}
          </FormItem>

          <Password {...formItemLayout}>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(
              <Input
                type="password"
                placeholder="Password"
                prefix={passwordIcon}
                size="large"
                suffix={
                  getFieldValue("password") ? (
                    <Icon
                      type="close-circle"
                      onClick={() => setFieldsValue({ password: null })}
                    />
                  ) : null
                }
              />
            )}
          </Password>
          <Forget {...forgetLayout}>
            <a className={"forgot"}>FORGOT?</a>
          </Forget>

          <FormItem {...formItemLayout}>
            <LoginButton
              type="primary"
              htmlType="submit"
              loading={this.props.loading}
            >
              LOG IN
            </LoginButton>
          </FormItem>
          <Footer {...formItemLayout}>
            <Row type="flex" justify="center">
              <FooterTitle span={"6"}>
                <a href="">Help</a>
              </FooterTitle>
              <FooterTitle span={"6"}>
                <a href="">Privacy</a>
              </FooterTitle>
              <FooterTitle span={"6"}>
                <a href="">Clause</a>
              </FooterTitle>
            </Row>
          </Footer>
        </Form>
      </FormContainer>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { loading: state.ui.loading };
};

const mapDispatchToProps = dispatch => {
  return { login: args => dispatch(userLogin(args)) };
};

const LoginPanel = Form.create()(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);

const LoginPage = () => (
  <Page>
    <div className={"container"}>
      <ContentRow type="flex" justify="center">
        <Col sm={14} xs={20}>
          <LoginPanel />
        </Col>
      </ContentRow>
    </div>
  </Page>
);

export default LoginPage;
