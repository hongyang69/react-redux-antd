import React from "react";
import { Form, Input, Select, Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROLE_ADMIN, ROLE_MANAGER, ROLE_STAFF } from "../../modules/users";
import UploadPicture from "../common/UploadPicture";
import _ from "lodash";
import Well from "../common/Well";

const FormItem = Form.Item;

const UserId = styled.div`
  display: none;
`;
const FormContainer = styled.div`
  margin-top: 20px;
  .ant-form-item-control {
    text-align: left;
  }
  @media (max-width: 576px) {
    .submit-buttons {
      .ant-form-item-control {
        text-align: center;
      }
    }
  }
`;
const FormHeader = styled.div`
  margin: 10px;
  text-align: center;
  font-size: 18px;
  color: #1890fe;
`;
const CancelButton = styled(Link)`
  margin-left: 10px;
`;

class UserForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = e => {
    e.preventDefault();
    const saveUser = this.props.saveUser;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.locationId) {
          const location = _.find(
            this.props.hospitals,
            h => h.id === values.locationId
          );
          saveUser({ ...values, locationName: location.name });
        } else {
          saveUser(values);
        }
      }
    });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    if (!this.props.user) {
      return null;
    }
    const { form } = this.props;
    let user = this.props.user;
    const isNew = !_.has(user, "id");
    const { getFieldDecorator, setFieldsValue } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 18,
          offset: 6
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    );

    return (
      <Well loading={this.props.loading} showChildren={true}>
        <FormContainer>
          <FormHeader>Personal Information</FormHeader>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Avatar">
              {getFieldDecorator("photo", {
                initialValue: _.has(user, "photo") ? user.photo : { url: null },
                rules: []
              })(
                <UploadPicture
                  success={response => {
                    const url = _.values(response.files)[0];
                    setFieldsValue({ photo: { url } });
                  }}
                  onRemove={() => {
                    setFieldsValue({ photo: { url: null } });
                  }}
                />
              )}
            </FormItem>
            {!isNew && (
              <UserId>
                <FormItem>
                  {getFieldDecorator("id", {
                    initialValue: user.id
                  })(<Input />)}
                </FormItem>
              </UserId>
            )}
            <FormItem {...formItemLayout} label="Username">
              {getFieldDecorator("username", {
                initialValue: user.username,
                rules: [
                  {
                    min: isNew ? 3 : 0,
                    message: "username cannot be less than 6 characters"
                  },
                  {
                    required: isNew,
                    message: "Please input username"
                  }
                ]
              })(<Input readOnly={!isNew} disabled={!isNew} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Name">
              {getFieldDecorator("fullname", {
                initialValue: user.fullname,
                rules: [
                  {
                    min: 4,
                    message: "Name cannot be less than 5 characters"
                  },
                  {
                    required: true,
                    message: "Please input name"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="E-mail">
              {getFieldDecorator("email", {
                initialValue: user.email,
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Password">
              {getFieldDecorator("password", {
                initialValue: user.password,
                rules: [
                  {
                    required: isNew,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.checkConfirm
                  }
                ]
              })(<Input type="password" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Confirm Password">
              {getFieldDecorator("confirm", {
                initialValue: user.password,
                rules: [
                  {
                    required: isNew,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.checkPassword
                  }
                ]
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Role">
              {getFieldDecorator("roles", {
                initialValue: user.roles,
                rules: [
                  {
                    required: true,
                    message: "Please select user role"
                  }
                ]
              })(
                <Select mode="tags">
                  <Select.Option value={ROLE_ADMIN}>Admin</Select.Option>
                  <Select.Option value={ROLE_STAFF}>Staff</Select.Option>
                  <Select.Option value={ROLE_MANAGER}>Manager</Select.Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Phone Number">
              {getFieldDecorator("phone", {
                initialValue: user.phone,
                rules: [
                  { required: true, message: "Please input your phone number!" }
                ]
              })(
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              )}
            </FormItem>
            <FormItem
              {...tailFormItemLayout}
              className={"submit-buttons"}
              style={{ display: !this.props.loading ? "inherit" : "none" }}
            >
              <Button type="primary" htmlType="submit">
                {isNew ? "Create" : "Save"}
              </Button>
              <CancelButton to={"/users"}>
                <Button type="danger">Cancel</Button>
              </CancelButton>
            </FormItem>
          </Form>
        </FormContainer>
      </Well>
    );
  }
}

export default UserForm;
