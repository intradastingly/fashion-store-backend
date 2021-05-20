import { Button, Checkbox, Row, Col, Typography, Space, Avatar } from "antd";
import { HighlightOutlined } from "@ant-design/icons";
import { CSSProperties, Component, useState, Context, useEffect } from "react";
import { Link } from "react-router-dom";

const { Paragraph } = Typography;
const { Title } = Typography;

function UserProfile() {
  const [streetName, setStreetName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [currentOrders, setCurrentOrders] = useState<Number>();

  return (
    <div style={profileContainer}>
      <div style={avatarContainer}>
        <Avatar>T</Avatar>
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
  height: "3rem",
  width: "100%",
  background: "#d6d6ce",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderBottom: "1px solid black",
  marginTop: "6rem",
};

const infoContainer: CSSProperties = {
  background: "#f5f5f5",
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  marginTop: "6rem",
};

const customerInfo: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const containerDivider: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  border: "1px solid black",
  borderTop: "none",
};

const flexRow: CSSProperties = {
  display: "flex",
  height: "100%",
};

const flexCenterColumn: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default UserProfile;
