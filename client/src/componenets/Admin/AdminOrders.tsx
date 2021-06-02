import { BugFilled, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, List, Row, Switch } from "antd";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { ApiContext, Order } from "../../contexts/ApiContext";
import { CartContext } from "../../contexts/CartContext";
import LoadingPage from "../LoadingPage";

interface Props {}

interface Props extends RouteComponentProps<{ id: string }> {}

function AdminOrders(props: Props) {
  const [allOrders, setAllOrders] = useState<any>();
  useEffect(() => {
    const loadAllOrders = async () => {
      const response = await fetch("/api/order", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const orders = await response.json();
      setAllOrders(orders);
    };
    loadAllOrders();
  }, []);

  const changeIsShippedSwitch = async (checked: any, id: any) => {
    let body = {
      isHandled: checked,
    };

    const response = await fetch("/api/orders/" + id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const orders = await response.json();

    return orders;
  };

  if (!allOrders) return <LoadingPage />;

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
          <div>
            <h1 style={{ fontWeight: "bold", fontSize: "1rem" }}>All Orders</h1>
          </div>
          <div style={{ display: "flex" }}>
            <Link to={"/profile"}>
              <Button type="primary">Back/Save</Button>
            </Link>
          </div>
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
          dataSource={allOrders}
          renderItem={(order: Order) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div>
                    <span>{order.userInfo.name}</span>
                  </div>
                }
                description={
                  <div>
                    <span style={{ marginRight: "1rem" }}>
                      Order id: {order._id}
                    </span>
                    <div>
                      <span style={{ marginRight: "1rem" }}>
                        Email: {order.userInfo.email}
                      </span>
                      <span style={{ marginRight: "1rem" }}>
                        Address: {order.userInfo.street}, {order.userInfo.city}
                      </span>
                    </div>
                    <span style={{ marginRight: "1rem" }}>
                      Date: {order.date}
                    </span>
                    <div>
                      <span style={{ marginRight: "1rem" }}>
                        Products:
                        {order.cart.map((p: any, index: number) => (
                          <div key={index}>{" " + p.product.title + ", "}</div>
                        ))}
                      </span>
                    </div>
                    <span style={{ marginRight: "1rem" }}>
                      Shipment: {order.deliveryMethod.shipmentCompany}
                    </span>

                    <span style={{ marginRight: "1rem" }}>
                      Shipped: {JSON.stringify(order.isHandled)}
                    </span>

                    {!order.isHandled && (
                      <>
                        <Switch
                          size="small"
                          onChange={(checked) =>
                            changeIsShippedSwitch(checked, order._id)
                          }
                        />
                      </>
                    )}
                  </div>
                }
              />
              <p style={editStyle}></p>
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
  marginTop: "8rem",
};

const columnStyle: CSSProperties = {
  width: "80%",
};

const editStyle: CSSProperties = {
  color: "red",
  display: "flex",
  justifyContent: "flex-end",
  borderBottom: "1px solid lightgrey",
  alignItems: "center",
  marginTop: "1rem",
};

export default AdminOrders;
