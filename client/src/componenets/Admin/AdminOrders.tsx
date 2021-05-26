import { BugFilled, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, List, Row } from "antd";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { ApiContext, Order } from "../../contexts/ApiContext";
import LoadingPage from "../LoadingPage";

interface Props{}

interface Props extends RouteComponentProps<{ id: string }> {}


function AdminOrders(props: Props) {

    // const { loadAllOrders} = useContext(ApiContext);

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
        }
        loadAllOrders()
    }, []);
    
    const isHandled = (order: any) => {
        if(order) {
            return (
                <p>isHandled: false</p>
            )
        } else {
            return <p>isHandled: True</p>
        }
    }

    if(!allOrders) return <LoadingPage />


    console.log(allOrders)
    return(
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
        <div style={{display: "flex"}}>
            <Link to={"/profile"}>
                <Button type="primary">Back</Button>
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
                          <span>Order id: {order._id}</span>
                          <span>{isHandled(order)}</span>
                      </div>
                  }
                />
                <p style={editStyle}>edit</p>
            </List.Item>
          )}
        />
      </Col>
    </Row>
    )
}

const containerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: "8rem",
  marginTop: "8rem"
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
};
export default AdminOrders