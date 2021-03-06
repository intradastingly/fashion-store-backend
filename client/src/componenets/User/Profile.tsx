import { Button, Typography, Avatar, Collapse } from "antd";
import React, { CSSProperties, useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import AvatarPic from "../../assets/Avatar2.png";
import { ApiContext } from "../../contexts/ApiContext";
import LoadingPage from "../LoadingPage";
import GetAdminList from "../Admin/AdminList";
import EditModal from "./EditModal";
import EditPasswordModal from "./EditPasswordModal";

const { Paragraph } = Typography;
const { Title } = Typography;
const { Panel } = Collapse;

function UserProfile() {
  const {
    session,
    activeUser,
    getUserSpecificOrders,
    orders,
    getUser,
    updateUser,
    updatePassword,
  } = useContext(ApiContext);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //useeffect for getting the correct account information
  useEffect(() => {
    getUser(session.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!orders) {
      getUserSpecificOrders(session.id);
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  const onFinishEdit = (values: any) => {
    updateUser(session.id, values);
    getUser(session.id);
    setIsEditModalVisible(false);
  };
  const onFinishPassword = (value: any) => {
    if (value.password === value.password2) {
      const body = { password: value.password };

      updatePassword(session.id, body);
    }
    setIsPasswordModalVisible(false);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsPasswordModalVisible(false);
  };

  if (!activeUser) return <LoadingPage />;

  return (
    <div style={profileContainer}>
      <div style={infoContainer}>
        <div style={customerContainer}></div>
        {activeUser.role === "admin" ? (
          <div style={adminComponentContainer}>
            <GetAdminList />
          </div>
        ) : (
          <div style={customerContainer}>
            <div style={avatarContainer}>
              <div>
                {isTabletOrMobile ? (
                  <div>
                    <Avatar src={AvatarPic} size={60} />
                  </div>
                ) : (
                  <div>
                    <Avatar src={AvatarPic} size={100} />
                  </div>
                )}
              </div>
              <div>
                {activeUser.role === "admin" ? (
                  <div>
                    <Title level={2}>{activeUser.role}</Title>
                  </div>
                ) : (
                  <div>
                    <Title level={2}>{activeUser.userName}</Title>
                  </div>
                )}
              </div>
            </div>
            <div style={titleContainer}>
              <Title level={3}>My information</Title>
            </div>
            <div style={customerInfo}>
              <div
                style={
                  isTabletOrMobile
                    ? contactInfoContainerMobile
                    : contactInfoContainer
                }
              >
                <div style={contactContainer}>
                  <Paragraph>Full name: {activeUser.fullName}</Paragraph>
                  <Paragraph>Phone Number: {activeUser.phoneNumber}</Paragraph>
                  <Paragraph>Email: {activeUser.email}</Paragraph>
                </div>
                <div style={addressContainer}>
                  <Paragraph>Street: {activeUser.address.street}</Paragraph>
                  <Paragraph>Zip Code: {activeUser.address.zipCode}</Paragraph>
                  <Paragraph>City: {activeUser.address.city}</Paragraph>
                  <Paragraph>Country: {activeUser.address.country}</Paragraph>
                </div>
              </div>
              <div style={editButtonContainer}>
                <Button type="primary" style={editBtns} onClick={showEditModal}>
                  Edit Information
                </Button>
                <Button
                  type="primary"
                  style={editBtns}
                  onClick={showPasswordModal}
                >
                  Change password
                </Button>
              </div>
              <EditModal
                isVisible={isEditModalVisible}
                onCancel={handleCancel}
                onFinish={onFinishEdit}
                activeUser={activeUser}
              />
              <EditPasswordModal
                isVisible={isPasswordModalVisible}
                onCancel={handleCancel}
                onFinish={onFinishPassword}
              />
            </div>
            <div style={orderContainer}>
              {!orders ? (
                <div>
                  <h4>You have no orders at this moment.</h4>
                </div>
              ) : (
                <>
                  <h4>Your Orders</h4>
                  <Collapse
                    style={
                      isTabletOrMobile ? collapseStyleMobile : collapseStyle
                    }
                    accordion
                  >
                    {orders.map((order: any, i: string) => (
                      <Panel header={order._id} key={i}>
                        <Collapse ghost accordion>
                          <Panel header="Products" key="1">
                            {order.cart.map((product: any, key: string) => (
                              <div style={accordionBorder}>
                                <p>Item: {product.product.title}</p>
                                <p>Price: {product.product.price}kr </p>
                                <p>Quantity: {product.quantity} </p>
                              </div>
                            ))}
                          </Panel>
                          <Panel header="Billing info" key="2">
                            <div>
                              <p>{order.userInfo.name}</p>
                              <p>{order.userInfo.email}</p>
                              <p>{order.userInfo.phone}</p>
                              <p>
                                {order.userInfo.street +
                                  ", " +
                                  order.userInfo.zipcode +
                                  ", " +
                                  order.userInfo.city +
                                  ", " +
                                  order.userInfo.country}
                              </p>
                            </div>
                          </Panel>
                          <Panel header="Shipping" key="3">
                            <div>
                              <p>{order.userInfo.name}</p>
                              <p>{order.userInfo.email}</p>
                              <p>{order.userInfo.phone}</p>
                              <p>
                                {order.userInfo.street +
                                  ", " +
                                  order.userInfo.zipcode +
                                  ", " +
                                  order.userInfo.city +
                                  ", " +
                                  order.userInfo.country}
                              </p>
                            </div>
                          </Panel>
                        </Collapse>
                        <h5>Total price: {order.totalPrice}kr</h5>
                        <h5>Shipped: {order.isHandled ? "Yes" : "No"}</h5>
                      </Panel>
                    ))}
                  </Collapse>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const collapseStyle: CSSProperties = {
  width: "30rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const collapseStyleMobile: CSSProperties = {
  width: "100%",
  marginBottom: "10rem",
  marginTop: "2rem",
};

const profileContainer: CSSProperties = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  marginTop: "5rem",
};

const avatarContainer: CSSProperties = {
  width: "100%",
  height: "10%",
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "2rem",
};

const infoContainer: CSSProperties = {
  background: "#fff",
  height: "100vh",
  width: "100%",
  overflow: "auto",
};

const customerInfo: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const adminComponentContainer: CSSProperties = {
  height: "100%",
  overflow: "auto",
};

const customerContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "space-evenly",
};

const orderContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "20rem",
  marginTop: "5rem",
};

const contactContainer: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
};

const addressContainer: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
};

const contactInfoContainer: CSSProperties = {
  display: "flex",
  width: "50%",
  alignItems: "center",
};

const contactInfoContainerMobile: CSSProperties = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  flexDirection: "column",
};

const titleContainer: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
};

const editButtonContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  margin: "1rem",
};

const editBtns: CSSProperties = {
  margin: "0.5rem",
};

const accordionBorder: CSSProperties = {
  borderBottom: "1px solid black",
  padding: ".5rem",
};
export default UserProfile;
