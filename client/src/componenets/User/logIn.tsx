import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { CSSProperties, Component, ContextType } from "react";
import { Link } from "react-router-dom";
import { CartContext, ISession } from '../../contexts/CartContext';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class userLogIn extends Component {
  context!: ContextType<typeof CartContext>
  static contextType = CartContext;

  onValuesChange = (values: string, allValues: ISession) => {
    const { updateLoginInfo } = this.context;
    updateLoginInfo(allValues)
  };

  onFinish = (values: any) => {
    console.log('test')
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div>
        <Row style={ContainerStyle}>
          <Col span={24} style={columnStyle}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              LOG IN{" "}
            </h1>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onValuesChange={this.onValuesChange}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Link to={"/profile"}>
                  <Button type="primary" htmlType="submit" style={buttonStyle}>
                    Log in
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const ContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "space-around",
  width: "60%",
  margin: "auto",
};

const columnStyle: CSSProperties = {
  marginTop: "14rem",
  marginBottom: "3rem",
};

const buttonStyle: CSSProperties = {
  marginBottom: "10rem",
};

export default userLogIn;
