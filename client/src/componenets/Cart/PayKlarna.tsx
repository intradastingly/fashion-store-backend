import { Component, ContextType, CSSProperties } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { CartContext } from "../../contexts/CartContext";

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};
export interface PaymentKlarna {
  ssn: string;
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
class PayKlarna extends Component<Props> {
  context!: ContextType<typeof CartContext>;
  static contextType = CartContext;

  onValuesChange = (values: any, allValues: any) => {
    const { updatePaymentInfo } = this.context;
    updatePaymentInfo(allValues.klarna);
  };

  onFinish = (values: any) => {
    const { updatePaymentInfo } = this.context;
    updatePaymentInfo(values.klarna);
    this.props.next();
  };

  render() {
    return (
      <CartContext.Consumer>
        {({ userInfo }) => {
          return (
            <Row style={formContainerStyle}>
              <Col span={24} style={columnStyle}>
                <h2>Billing information</h2>
                <Form
                  {...layout}
                  name="nest-messages"
                  validateMessages={validateMessages}
                  onFinish={this.onFinish}
                  initialValues={{
                    klarna: {
                      name: userInfo?.name,
                      email: userInfo?.email,
                      phone: userInfo?.phone,
                      street: userInfo?.street,
                      zipcode: userInfo?.zipcode,
                      city: userInfo?.city,
                    },
                  }}
                >
                  <Form.Item
                    name={["klarna", "ssn"]}
                    label="SSN"
                    rules={[
                      { required: true },
                      {
                        pattern: new RegExp(
                          /^(19|20)?(\d{6}(-|\s)\d{4}|(?!19|20)\d{10})$/
                        ),
                        message: "Please enter a valid SSN",
                      },
                    ]}
                  >
                    <Input placeholder="YYMMDDXXXX" />
                  </Form.Item>
                  <Form.Item
                    name={["klarna", "name"]}
                    label="Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["klarna", "email"]}
                    label="Email"
                    rules={[{ type: "email", required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["klarna", "phone"]}
                    label="Phone"
                    rules={[
                      { required: true },
                      {
                        pattern: new RegExp(
                          /^(0)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/
                        ),
                        message: "Please enter a valid phone number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["klarna", "street"]}
                    label="Street"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["klarna", "zipcode"]}
                    label="Zip-code"
                    rules={[
                      { required: true },
                      {
                        pattern: new RegExp(
                          /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/
                        ),
                        message: "Please enter a valid zip code",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["klarna", "city"]}
                    label="City"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
                    <Button type="primary" htmlType="submit">
                      Next
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default PayKlarna;

const formContainerStyle: CSSProperties = {
  display: "flex",
  width: "100%",
  margin: "auto",
};

const columnStyle: CSSProperties = {
  marginTop: "3rem",
  marginBottom: "3rem",
};
