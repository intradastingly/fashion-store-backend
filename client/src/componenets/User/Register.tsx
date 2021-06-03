/* eslint-disable no-template-curly-in-string */
import { Button, Form, Input, Typography } from "antd";
import React, {
  useContext,
} from "react";
import { ApiContext } from "../../contexts/ApiContext";
import {
  LockOutlined,
  SmileOutlined,
  TagOutlined,
  NumberOutlined,
  MailOutlined,
  HomeOutlined,
  BarcodeOutlined,
  PushpinOutlined,
  FlagOutlined,
} from "@ant-design/icons";

function RegisterForm() {
  const { registerHandler } = useContext(ApiContext);
  const { Title } = Typography;
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values: any) => {
    registerHandler(values);
  };

  return (
    <>
      <Form
        {...layout}
        name="userEditor"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"userName"}
          rules={[{ required: true, message: "Please enter a username." }]}
        >
          <Input
            prefix={<SmileOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "Please enter a password." }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name={"fullName"}
          rules={[{ required: true, message: "Please enter your full name." }]}
        >
          <Input
            prefix={<TagOutlined className="site-form-item-icon" />}
            placeholder="Full name"
          />
        </Form.Item>
        <Form.Item
          name={"phoneNumber"}
          rules={[
            { required: true, message: "Please enter your phone number." },
          ]}
        >
          <Input
            prefix={<NumberOutlined className="site-form-item-icon" />}
            placeholder="Phone number"
          />
        </Form.Item>

        <Form.Item
          name={"email"}
          rules={[{ required: true, message: "Please enter your email." }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Title level={4} style={{ textAlign: "center", marginTop: "2rem" }}>
          Where should we send the goods? 😎
        </Title>
        <Form.Item
          name={["address", "street"]}
          rules={[{ required: true, message: "Please enter your street." }]}
        >
          <Input
            prefix={<HomeOutlined className="site-form-item-icon" />}
            placeholder="Street"
          />
        </Form.Item>
        <Form.Item
          name={["address", "zipCode"]}
          rules={[{ required: true, message: "Please enter your zip code." }]}
        >
          <Input
            prefix={<BarcodeOutlined className="site-form-item-icon" />}
            placeholder="Zip code"
          />
        </Form.Item>
        <Form.Item
          name={["address", "city"]}
          rules={[{ required: true, message: "Please enter your city." }]}
        >
          <Input
            prefix={<PushpinOutlined className="site-form-item-icon" />}
            placeholder="City"
          />
        </Form.Item>
        <Form.Item
          name={["address", "country"]}
          rules={[{ required: true, message: "Please enter your country." }]}
        >
          <Input
            prefix={<FlagOutlined className="site-form-item-icon" />}
            placeholder="Country"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 0 },
};

export default RegisterForm;
