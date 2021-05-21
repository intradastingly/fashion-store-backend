import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import {
  CSSProperties,
  Component,
  ContextType,
  useState,
  useContext,
} from "react";
import { Link, Route } from "react-router-dom";
import { ApiContext } from "../../contexts/ApiContext";

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

interface Credentials {
  userName: string;
  password: string;
}

function UserLogIn() {
  const { loginHandler } = useContext(ApiContext);

  const [loginCredentials, setloginCredentials] = useState<Credentials>({
    userName: "",
    password: "",
  });

  const onFinish = (values: any) => {
    console.log("test");
    console.log("Success:", values.password);
    setloginCredentials({
      userName: values.username,
      password: values.password,
    });
    loginHandler(loginCredentials);

    console.log(loginCredentials, "credentials");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const reloadPage = () => {
    setTimeout(reload, 300);
    function reload() {
      window.location.reload();
    }
  };

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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              {/* <Link to={"/profile"}> */}
              <Route
                render={({ history }) => (
                  <Button
                    onClick={() => {
                      loginHandler(loginCredentials, history);
                    }}
                    type="primary"
                    htmlType="submit"
                    style={buttonStyle}
                  >
                    Log in
                  </Button>
                )}
              />
              {/* </Link> */}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
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

export default UserLogIn;
