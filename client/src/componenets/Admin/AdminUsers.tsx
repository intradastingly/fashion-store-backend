import { Button, Col, List, Row } from "antd";
import React, { CSSProperties, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../../contexts/ApiContext";

function AdminUsers() {
  const { loadAllUsers, users } = useContext(ApiContext);

  useEffect(() => {
    loadAllUsers();
  }, []);

  return (
    <Row style={containerStyle}>
      <Col style={columnStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
            marginBottom: "3rem",
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>All Users</h1>
          <Link to={"/profile"}>
            <Button type="primary">All Products</Button>
          </Link>
        </div>

        <List
          grid={{
            gutter: 12,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 1,
          }}
          dataSource={users}
          renderItem={(user) => (
            <List.Item>
              <Link to={"/edit-user/" + user._id}>
                <List.Item.Meta
                  title={
                    <>
                      <div style={userContainer}>
                        <div style={prefixContainer}>
                          Username:&nbsp;
                          <Link to={"/edit-user/" + user._id}>
                            {user.userName}
                          </Link>
                        </div>
                        <div style={prefixContainer}>
                          Name:&nbsp;
                          <span>{user.fullName}</span>
                        </div>
                      </div>
                    </>
                  }
                  description={[user.role.split(".")[0]]}
                />
                <p style={editStyle}>edit</p>
              </Link>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}

const containerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: "8rem",
};

const columnStyle: CSSProperties = {
  marginTop: "8rem",
  width: "80%",
};

const userContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const prefixContainer: CSSProperties = {
  display: "flex",
};

const editStyle: CSSProperties = {
  color: "red",
  display: "flex",
  justifyContent: "flex-end",
  borderBottom: "1px solid lightgrey",
  alignItems: "center",
};

export default AdminUsers;
