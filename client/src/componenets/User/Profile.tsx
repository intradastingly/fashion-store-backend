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
  Spin,
  Collapse,
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
import { useMediaQuery } from "react-responsive";
import AvatarPic from "../../assets/Avatar2.png";
import { ApiContext } from "../../contexts/ApiContext";
import LoadingPage from "../LoadingPage";
import GetAdminList from "../Admin/AdminList";

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
  } = useContext(ApiContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //useeffect for getting the correct account information
  useEffect(() => {
    getUser(session.id);
  }, []);

  useEffect(() => {
    if (!orders) {
      getUserSpecificOrders(session.id);
    } else {
      return;
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const onFinish = (values: any) => {
    updateUser(session.id, values);
    getUser(session.id);
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
    // number: {
    //   range: "${label} must be between ${min} and ${max}",
    // },
  };
  /* eslint-enable no-template-curly-in-string */

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
                <Button type="primary" onClick={showModal}>
                  Edit Information
                </Button>
              </div>
              <Modal
                title="Edit your profile"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                ]}
              >
                <div style={modalStyle}>
                  <Form
                    {...layout}
                    name="userEditor"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                  >
                    <Form.Item
                      initialValue={activeUser.fullName}
                      name={"fullName"}
                      rules={[{ required: true }]}
                      label="Name"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      initialValue={activeUser.phoneNumber}
                      name={"phoneNumber"}
                      rules={[{ required: true }]}
                      label="Phone Number"
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      initialValue={activeUser.email}
                      rules={[{ required: true, type: "email" }]}
                      name={"email"}
                      label="Email"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      initialValue={activeUser.address.street}
                      name={["address", "street"]}
                      rules={[{ required: true }]}
                      label="Street"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      initialValue={activeUser.address.zipCode}
                      name={["address", "zipCode"]}
                      rules={[{ required: true }]}
                      label="Zip Code"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      initialValue={activeUser.address.city}
                      name={["address", "city"]}
                      rules={[{ required: true }]}
                      label="City"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      initialValue={activeUser.address.country}
                      name={["address", "country"]}
                      rules={[{ required: true }]}
                      label="Country"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      initialValue={activeUser.fullName}
                      wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
            </div>
            <div style={orderContainer}>
              {!orders ? (
                <div>
                  <h4>You have no orders at this moment.</h4>
                </div>
              ) : (
                <Collapse
                  style={isTabletOrMobile ? collapseStyleMobile : collapseStyle}
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
              )}
            </div>
          </div>
        )}
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
  height: "50vh",
  display: "flex",
  flexDirection: "row",
  width: "100%",
  overflow: "auto",
};

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
};

const accordionBorder: CSSProperties = {
  borderBottom: "1px solid black",
  padding: ".5rem",
};
export default UserProfile;
