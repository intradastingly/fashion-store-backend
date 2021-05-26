import { Form, Input, Button, Checkbox, Row, Col, Modal, Space } from "antd";
import {
  CSSProperties,
  Component,
  ContextType,
  useState,
  useContext,
} from "react";
import { Link, Route } from "react-router-dom";
import { ApiContext } from "../../contexts/ApiContext";
import LoadingPage from "../LoadingPage";

interface Credentials {
  userName: string;
  password: string;
}
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

  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const loginCredentials = { userName: username, password: password };

  const onFinish = (e: any) => {
    e.preventDefault();
    renderLoading();
    loginHandler(loginCredentials);
    console.log(loggedIn, "logged in bool");
    reloadPage();
  };

  const onRegister = async () => {
    const userInfo = {
      userName: newUsername,
      fullName: fullName,
      phoneNumber: phoneNumber,
      password: newPassword,
      email: email,
      address: {
        street: street,
        zipCode: zipCode,
        city: city,
        country: country,
      },
    };

    registerHandler(userInfo);
    setIsModalVisible(false);
    // reloadPage();
  };

  const reloadPage = () => {
    setTimeout(reload, 300);
    function reload() {
      window.location.reload();
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
            <form name="basic">
              <div style={formContainer}>
                <div>
                  <input
                    style={inputField}
                    name="username"
                    placeholder="username"
                    onChange={(e: any) => setUsername(e.target.value)}
                    type="text"
                  />
                </div>
                <div>
                  <input
                    style={inputField}
                    name="username"
                    placeholder="password"
                    onChange={(e: any) => setPassword(e.target.value)}
                    type="password"
                  />
                </div>
              </div>
              <div style={buttonContainer}>
                <Button onClick={(e: any) => onFinish(e)}>Log In</Button>
                <Button onClick={(e: any) => openModal(e)}>Register</Button>
              </div>
            </form>
            <div>
              <Modal
                visible={isModalVisible}
                onCancel={closeModal}
                onOk={onRegister}
              >
                <div style={modalContainer}>
                  {userCreated ? (
                    <div style={successTitle}>
                      <h3>
                        User created, you can now log in to your new account 😎
                      </h3>
                    </div>
                  ) : (
                    <>
                      <div style={modalTitle}>
                        <h2>Register a new user</h2>
                      </div>
                      <div style={fullContainer}>
                        <form name="basic" style={form}>
                          <div style={modalFormContainer}>
                            <div>
                              <input
                                autoComplete="off"
                                style={inputField}
                                name="username"
                                placeholder="Username"
                                onChange={(e: any) =>
                                  setNewUsername(e.target.value)
                                }
                                type="text"
                              />
                            </div>
                            <div>
                              <input
                                autoComplete="new-password"
                                style={inputField}
                                name="username"
                                placeholder="Password"
                                onChange={(e: any) =>
                                  setNewPassword(e.target.value)
                                }
                                type="password"
                              />
                            </div>
                            <div>
                              <input
                                autoComplete="new-password"
                                style={inputField}
                                name="FullName"
                                placeholder="Full Name"
                                onChange={(e: any) =>
                                  setFullName(e.target.value)
                                }
                                type="text"
                              />
                            </div>
                            <div>
                              <input
                                autoComplete="new-password"
                                style={inputField}
                                name="Phone"
                                placeholder="Phone number"
                                onChange={(e: any) =>
                                  setPhoneNumber(e.target.value)
                                }
                                type="text"
                              />
                            </div>
                            <div>
                              <input
                                autoComplete="off"
                                style={inputField}
                                name="Email"
                                placeholder="Email"
                                onChange={(e: any) => setEmail(e.target.value)}
                              />
                            </div>
                            <Space direction="vertical">
                              <div>
                                <h3>Where do you want the goods? 😊</h3>
                              </div>
                            </Space>
                            <div>
                              <input
                                autoComplete="off"
                                style={inputField}
                                name="Street"
                                placeholder="Street"
                                onChange={(e: any) => setStreet(e.target.value)}
                              />
                            </div>
                            <div>
                              <input
                                autoComplete="off"
                                style={inputField}
                                name="ZipCode"
                                placeholder="Zip Code"
                                onChange={(e: any) =>
                                  setZipCode(e.target.value)
                                }
                              />
                            </div>
                            <div>
                              <input
                                autoComplete="off"
                                style={inputField}
                                name="City"
                                placeholder="City"
                                onChange={(e: any) => setCity(e.target.value)}
                              />
                            </div>
                            <div>
                              <input
                                autoComplete="off"
                                style={inputField}
                                name="Country"
                                placeholder="Country"
                                onChange={(e: any) =>
                                  setCountry(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              </Modal>
            </div>
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

const modalContainer: CSSProperties = {
  height: "50vh",
  display: "flex",
  flexDirection: "column",
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
