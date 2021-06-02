import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Modal,
  Space,
  Typography,
  message,
} from "antd";
import {
  CSSProperties,
  Component,
  ContextType,
  useState,
  useContext,
  useEffect,
} from "react";
import { Link, Route } from "react-router-dom";

import { ApiContext, Credentials } from "../../contexts/ApiContext";
import LoadingPage from "../LoadingPage";
import RegisterForm from "./Register";

// interface Credentials {
//   userName: string;
//   password: string;
// }
function UserLogIn() {
  const {
    loginHandler,
    loggedIn,
    registerHandler,
    userCreated,
    getUser,
    session,
  } = useContext(ApiContext);

  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // const loginCredentials = { userName: username, password: password };
  const { Title } = Typography;

  const success = () => {
    message.success("User created ✔");
  };

  useEffect(() => {
    onRegister();
  }, [userCreated]);

  const onFinish = (value: Credentials) => {
    renderLoading();
    loginHandler(value);
    reloadPage();
  };

  const reloadPage = () => {
    setTimeout(reload, 300);
    function reload() {
      window.location.reload();
    }
  };

  const onRegister = () => {
    if (userCreated === true) {
      setIsModalVisible(false);
      success();
    }
  };

  function openModal(e: any) {
    e.preventDefault();
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  function renderLoading() {
    setLoading(true);
    setTimeout(() => setLoading(false), 5000);
  }

  if (loading) return <LoadingPage />;

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
          <div style={fullContainer}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Username"
                name="userName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={(e: any) => onFinish}
                >
                  Submit
                </Button>
                <Button onClick={(e: any) => openModal(e)}>Register</Button>
              </Form.Item>
            </Form>
            <div>
              <Modal
                visible={isModalVisible}
                footer={[
                  <Button key="back" onClick={closeModal}>
                    Cancel
                  </Button>,
                ]}
                onCancel={closeModal}
              >
                <div style={modalContainer}>
                  <>
                    <div style={modalTitle}>
                      <h2>Register a new user</h2>
                    </div>
                    <div style={fullContainer}>
                      <RegisterForm />
                    </div>
                  </>
                </div>
              </Modal>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

//formlayout
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

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

const modalContainer: CSSProperties = {
  height: "50vh",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
};

const buttonContainer: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "2rem",
  width: "10rem",
};

const modalTitle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const successTitle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
};

const form: CSSProperties = {
  height: "100%",
  width: "100%",
};

const formContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
  justifyContent: "space-around",
  width: "100%",
  height: "100%",
};

const fullContainer: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
};

const inputField: CSSProperties = {
  borderBottom: "1px solid lightgray",
  outline: "none",
  padding: "4px 10px",
  border: "3px solid #9176f2",
  borderRadius: "5px",
};

const modalFormContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: "100%",
  width: "100%",
  overflow: "auto",
};

export default UserLogIn;
