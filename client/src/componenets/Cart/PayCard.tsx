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
  number: {
    range: "Input must be between ${min} and ${max}",
  },
};
export interface PaymentCard {
  cardNumber: string;
  expDate: string;
  cardName: string;
  cvc: string;
}
interface Props {
  next(): void;
}
class PayCard extends Component<Props> {
  context!: ContextType<typeof CartContext>;
  static contextType = CartContext;

  onValuesChange = (values: any, allValues: any) => {
    const { updatePaymentInfo } = this.context;
    updatePaymentInfo(allValues.card);
  };

  onFinish = (values: any) => {
    this.props.next();
  };

  render() {
    return (
      <Row style={formContainerStyle}>
        <Col span={24} style={columnStyle}>
          <h2>Card details</h2>
          <Form
            {...layout}
            name="nest-messages"
            onValuesChange={this.onValuesChange}
            validateMessages={validateMessages}
            onFinish={this.onFinish}
          >
            <Form.Item
              name={["card", "cardno"]}
              label="Card number"
              rules={[
                // { min: 13, max: 19 },
                {
                  required: true,
                  message: "Card number is required.",
                },
                {
                  pattern: new RegExp(
                    /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
                  ),
                  message: "Please enter a valid credit card number.",
                },
              ]}
            >
              <Input placeholder="XXXX XXXX XXXX XXXX" />
            </Form.Item>
            <Form.Item
              name={["card", "expdate"]}
              label="Expiry date"
              rules={[
                { required: true },
                {
                  pattern: new RegExp(
                    /^(0[1-9]|1[0-2])\/?(([0-9]{4}|[0-9]{2})$)/
                  ),
                  message: "Please enter a valid CVV",
                },
              ]}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>
            <Form.Item
              name={["card", "name"]}
              label="Name on card"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["card", "cvc"]}
              label="CVC/CCV"
              rules={[
                { required: true },
                {
                  pattern: new RegExp(/^[0-9]{3,4}$/),
                  message: "Please enter a valid CVV",
                },
              ]}
            >
              <Input placeholder="e.g. 123" />
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
  }
}

export default PayCard;

const formContainerStyle: CSSProperties = {
  display: "flex",
  width: "100%",
};

const columnStyle: CSSProperties = {
  marginTop: "3rem",
  marginBottom: "3rem",
};
