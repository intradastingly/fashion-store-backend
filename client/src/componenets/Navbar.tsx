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
import { useMediaQuery } from "react-responsive";

function Navbar() {
  const { loggedIn, logOutHandler, session } = useContext(ApiContext);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
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
    <div style={isTabletOrMobile ? layoutStyleMobile : layoutStyle}>
      <div style={isTabletOrMobile ? logoContainerMobile : logoContainer}>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            style={isTabletOrMobile ? logoStyleMobile : logoStyle}
          />
        </Link>
      </div>
      <div style={isTabletOrMobile ? actionContainerMobile : actionContainer}>
        <div
          style={isTabletOrMobile ? navRightContainerMobile : navRightContainer}
        >
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
            <div style={profileLink}>
              <Link to="/profile">
                <h3 style={{ color: "white" }}>Panel</h3>
              </Link>
            </div>
          ) : (
            <div style={profileLink}>
              <Link to="/profile">
                <h3 style={{ color: "white" }}>Profile</h3>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const layoutStyle: CSSProperties = {
  width: "100%",
  background: "black",
  height: "6rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  zIndex: 100,
  borderBottom: "none",
  position: "fixed",
};

const layoutStyleMobile: CSSProperties = {
  width: "100%",
  background: "black",
  height: "4rem",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  zIndex: 100,
  borderBottom: "none",
  position: "fixed",
};

const logoStyle: CSSProperties = {
  padding: "2rem",
  width: "12rem",
};

const profileLink: CSSProperties = {
  marginLeft: "2rem",
};

const logoStyleMobile: CSSProperties = {
  padding: "2rem",
  width: "8rem",
};

const navRightContainer: CSSProperties = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "100%",
  width: "80%",
};

const navRightContainerMobile: CSSProperties = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "100%",
  width: "70%",
};

const logoContainer: CSSProperties = {
  width: "100%",
};

const logoContainerMobile: CSSProperties = {
  width: "25%",
};

const actionContainer: CSSProperties = {
  width: "50%",
  display: "flex",
  justifyContent: "center",
};

const actionContainerMobile: CSSProperties = {
  width: "60%",
  display: "flex",
  justifyContent: "flex-end",
};

export default Navbar;
