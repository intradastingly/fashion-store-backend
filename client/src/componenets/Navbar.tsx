import { Row, Col, Menu, Button, Space } from "antd";
import { Header } from "antd/lib/layout/layout";
import { CSSProperties, useContext, useState, useEffect } from "react";
import logo from "../assets/logga-fs.png";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AddToBadge from "./Badge";
import ApiProvider from "../contexts/ApiContext";
import { ApiContext } from "../contexts/ApiContext";
import LoadingPage from "./LoadingPage";

function Navbar() {
  const { loggedIn, logOutHandler, session } = useContext(ApiContext);

  const reloadPage = () => {
    setTimeout(reload, 300);
    function reload() {
      window.location.reload();
    }
  };

  if (loggedIn) {
    console.log(session);
  }

  return (
    <div style={layoutStyle}>
      <div style={logoContainer}>
        <Link to="/">
          <img src={logo} alt="logo" style={logoStyle} />
        </Link>
      </div>
      <div style={actionContainer}>
        <div style={navRightContainer}>
          {!loggedIn ? (
            <Button href="/login" type="primary" size="small">
              Log in
            </Button>
          ) : (
            <Button
              onClick={() => {
                logOutHandler();
                reloadPage();
              }}
              type="link"
            >
              Log out
            </Button>
          )}

          <Link to="/cart" style={{ color: "white" }}>
            <AddToBadge />
          </Link>
          {!session ? null : session.role === "admin" ? (
            <Link to="/profile">
              <h3 style={{ color: "white" }}>Panel</h3>
            </Link>
          ) : (
            <Link to="/profile">
              <h3 style={{ color: "white" }}>Profile</h3>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const layoutStyle: CSSProperties = {
  width: "100%",
  background: "black",
  height: window.innerWidth > 768 ? "6rem" : "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  zIndex: 100,
  borderBottom: "none",
  position: "fixed",
};

const logoStyle: CSSProperties = {
  marginLeft: window.innerWidth > 768 ? "-1rem" : "-3rem",
  padding: "2rem",
  width: window.innerWidth > 768 ? "11.5rem" : "8rem",
};

const navRightContainer: CSSProperties = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "100%",
  width: "80%",
};

const logoContainer: CSSProperties = {
  width: "100%",
};

const actionContainer: CSSProperties = {
  width: "50%",
  display: "flex",
  justifyContent: "center",
};

export default Navbar;
