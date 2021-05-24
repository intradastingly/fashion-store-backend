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

interface Credentials {
  userName: string;
  password: string;
}
function UserLogIn() {
  const { loginHandler, loggedIn } = useContext(ApiContext);

  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const loginCredentials = { userName: username, password: password };
  const onFinish = (e: any) => {
    e.preventDefault();
    loginHandler(loginCredentials);
    console.log(loggedIn, "logged in bool");
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
          <div>
            <form name="basic" style={formContainer}>
              <input
                name="username"
                placeholder="username"
                onChange={(e: any) => setUsername(e.target.value)}
                type="text"
              />
              <input
                name="username"
                placeholder="password"
                onChange={(e: any) => setPassword(e.target.value)}
                type="text"
              />
              <button onClick={(e: any) => onFinish(e)}>Log In</button>
            </form>
          </div>
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

const formContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

export default UserLogIn;
