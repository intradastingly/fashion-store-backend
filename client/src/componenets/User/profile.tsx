import {
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
  Space,
  Avatar,
  Layout,
  Modal,
  Form,
  Input,
} from "antd";
import { HighlightOutlined } from "@ant-design/icons";
import React, {
  CSSProperties,
  Component,
  useState,
  Context,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import AvatarPic from "../../assets/Avatar2.png";
import { ApiContext } from "../../contexts/ApiContext";
import ErrorPage from "../ErrorPage";

const { Paragraph } = Typography;
const { Title } = Typography;

function UserProfile() {
  const { session, currentUser } = useContext(ApiContext);
  const [user, setUser] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getUser(session.id);
  }, []);

  const getUser = async (id: string) => {
    const response = await fetch(`api/accounts/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const incomingUser = await response.json();
    setUser(incomingUser);
  };

  const updateUser = async (id: string, data: any) => {
    console.log(data, "Incoming data from form");
   
    const response = await fetch(`api/accounts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result, "Result from server after fetch has been made");
    return result;
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
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
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    updateUser(session.id, values);
  };

  if (!user) return <ErrorPage />;

  return (
    <div style={profileContainer}>
      <div style={avatarContainer}>
        <div>
          <Avatar src={AvatarPic} size={100} />
        </div>
        <div>
          <Title>{user.userName}</Title>
        </div>
      </div>
      <div style={infoContainer}>
        <div style={customerContainer}>
          <div style={customerInfo}>
            <div>
              <Title level={3}>My information</Title>
            </div>
            <div>
              <Paragraph>Full name: {user.fullName}</Paragraph>
              <Paragraph>Phone Number: {user.phoneNumber}</Paragraph>
              <Paragraph>Email: {user.email}</Paragraph>
              <Paragraph>Street: {user.address.street}</Paragraph>
              <Paragraph>Zip Code: {user.address.zipCode}</Paragraph>
              <Paragraph>City: {user.address.city}</Paragraph>
              <Paragraph>Country: {user.address.country}</Paragraph>
            </div>
            <Button type="primary" onClick={showModal}>
              Edit Information
            </Button>
            <Modal
              title="Edit your profile"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div style={modalStyle}>
                <Form
                  {...layout}
                  name="userEditor"
                  onFinish={onFinish}
                  validateMessages={validateMessages}
                >
                  <Form.Item name={"fullName"} label="Name">
                    <Input />
                  </Form.Item>
                  <Form.Item name={"phoneNumber"} label="Phone Number">
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name={"email"}
                    rules={[{ type: "email" }]}
                    label="Email"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name={["address", "street"]} label="Street">
                    <Input />
                  </Form.Item>
                  <Form.Item name={["address", "zipCode"]} label="Zip Code">
                    <Input />
                  </Form.Item>
                  <Form.Item name={["address", "city"]} label="City">
                    <Input />
                  </Form.Item>
                  <Form.Item name={["address", "country"]} label="Country">
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
          <div style={customerInfo}>
            {/* Here we can map out orders that match the session.username with links to that order */}
            <div style={orderContainer}>
              <div>
                <Title level={3}>My Orders</Title>
              </div>
              <div>
                <h4>You have no orders at this moment.</h4>
              </div>
              <div>
                <Button>Details</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// form in modal offset styling
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const modalStyle: CSSProperties = {
  height: "26rem",
};

const profileContainer: CSSProperties = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
};

const avatarContainer: CSSProperties = {
  width: "100%",
  height: "15vh",
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  alignItems: "center",
  borderBottom: "1px solid black",
  paddingBottom: "2rem",
  marginTop: "10rem",
};

const infoContainer: CSSProperties = {
  background: "#f5f5f5",
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const customerInfo: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const customerContainer: CSSProperties = {
  display: "flex",
  width: "100%",
  flexDirection: window.innerWidth < 700 ? "column" : "row",
  justifyContent: "space-evenly",
};

const headerContainer: CSSProperties = {
  display: "flex",
  width: "100%",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const orderContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const flexCenterColumn: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default UserProfile;
