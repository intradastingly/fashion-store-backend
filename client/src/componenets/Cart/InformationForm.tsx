import { Form, Input, Button, Row, Col } from "antd";
import {
  Component,
  ContextType,
  CSSProperties,
  useContext,
  useEffect,
} from "react";
import { ApiContext } from "../../contexts/ApiContext";
import { CartContext } from "../../contexts/CartContext";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
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

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  street: string;
  zipcode: string;
  city: string;
}
interface Props {
  next(): void;
}

function InformationForm(props: Props) {
  const { session, getUser, activeUser } = useContext(ApiContext);
  const { updateUserInfo } = useContext(CartContext);

  useEffect(() => {
    getUser(session.id);
    console.log(activeUser);
    
  }, []);

  const onValuesChange = (values: any, allValues: any) => {
    updateUserInfo(allValues.user);
  };

  const onFinish = (values: UserInfo) => {
    console.log("Success:", values);
    props.next();
  };

  return (
    <Row style={formContainerStyle}>
      <Col span={24} style={columnStyle}>
        <h2>Your information</h2>
        {activeUser ? (
          <Form
            {...layout}
            name="nest-messages"
            onValuesChange={onValuesChange}
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
            <Form.Item
              name={["user", "name"]}
              initialValue={activeUser.fullName}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              initialValue={activeUser.email}
              label="Email"
              rules={[{ type: "email", required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "phone"]}
              initialValue={activeUser.phoneNumber}
              label="Phone"
              rules={[{ min: 10, max: 10, required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "street"]}
              initialValue={activeUser.address.street}
              label="Street"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "zipcode"]}
              initialValue={activeUser.address.zipCode}
              label="Zipcode"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "city"]}
              initialValue={activeUser.address.city}
              label="City"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </Col>
    </Row>
  );
}

export default InformationForm;

const formContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "space-around",
  width: "100%",
  margin: "auto",
};

const columnStyle: CSSProperties = {
  marginTop: "3rem",
  marginBottom: "3rem",
};
