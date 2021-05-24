import {
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
  Space,
  Avatar,
  Layout,
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
  const [streetName, setStreetName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [currentOrders, setCurrentOrders] = useState<Number>();
  const { session } = useContext(ApiContext);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser(session);
    console.log(user);
    
  });

  if (!user) return <ErrorPage/>

  return (
    <div style={profileContainer}>
      <div style={avatarContainer}>
        <div>
          <Avatar src={AvatarPic} size={100} />
        </div>
        <div>
          <Title>{user.username}</Title>
        </div>
      </div>
      <div style={infoContainer}>
        <div style={customerContainer}>
          <div style={customerInfo}>
            <div>
              <Title level={3}>My information</Title>
            </div>
            <div>
              <Paragraph
                editable={{
                  icon: <HighlightOutlined />,
                  tooltip: "click to edit text",
                  onChange: setCustomerName,
                }}
              >
                Full name: {user.fullName}
              </Paragraph>
              <Paragraph
                editable={{
                  icon: <HighlightOutlined />,
                  tooltip: "click to edit text",
                  onChange: setStreetName,
                }}
              >
                Street: {user.address.street}
              </Paragraph>
              <Paragraph
                editable={{
                  icon: <HighlightOutlined />,
                  tooltip: "click to edit text",
                  onChange: setZipCode,
                }}
              >
                Zip Code: {user.address.zipCode}
              </Paragraph>
              <Paragraph
                editable={{
                  icon: <HighlightOutlined />,
                  tooltip: "click to edit text",
                  onChange: setCityName,
                }}
              >
                City: {user.address.city}
              </Paragraph>
            </div>
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
