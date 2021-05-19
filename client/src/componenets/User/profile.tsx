import { Button, Checkbox, Row, Col, Typography, Space } from "antd";
import { HighlightOutlined } from "@ant-design/icons";
import { CSSProperties, Component, useState } from "react";
import { Link } from "react-router-dom";

const { Paragraph } = Typography;
const { Title } = Typography;

function UserProfile() {
  const [streetName, setStreetName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [currentOrders, setCurrentOrders] = useState(0);
  return (
    <div style={profileContainer}>
      <div style={infoContainer}>
        <div style={profileNavigation}>
          <Paragraph>My Information</Paragraph>
          <Paragraph>My Orders</Paragraph>
        </div>
        <div style={flexRow}>
          <div style={containerDivider}>
            <div style={customerInfo}>
              <div>
                <Paragraph editable={{ onChange: setCustomerName }}>
                  Name: {customerName}
                </Paragraph>
              </div>
              <div>
                <Paragraph editable={{ onChange: setStreetName }}>
                  Street: {streetName}
                </Paragraph>
              </div>
              <div>
                <Paragraph editable={{ onChange: setZipCode }}>
                  Zip-Code: {zipCode}
                </Paragraph>
              </div>
              <div>
                <Paragraph editable={{ onChange: setCityName }}>
                  City: {cityName}
                </Paragraph>
              </div>
            </div>
          </div>
          <div style={containerDivider}>
            <div>
              <div>
                <Title level={4}>Current Orders: {currentOrders}</Title>
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

const profileNavigation: CSSProperties = {
  height: "3rem",
  width: "100%",
  background: "#d6d6ce",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderBottom: "1px solid black",
};

const infoContainer: CSSProperties = {
  background: "#edede4",
  height: "30rem",
  width: "50rem",
  display: "flex",
  flexDirection: "column",
  marginTop: "10rem",
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

export default UserProfile;
