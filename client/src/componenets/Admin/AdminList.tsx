import { PlusOutlined } from "@ant-design/icons";
import { AutoComplete, Avatar, Button, Col, List, Row } from "antd";
import { CSSProperties, useContext } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../../contexts/ApiContext";
import image from "../../assets/prod5.png"

interface Props {}

function GetAdminList(props: Props) {
  const { allProducts } = useContext(ApiContext);

  console.log(allProducts)

  return (
    <Row style={containerStyle}>
      <Col style={col}>
        <h1 style={{ fontWeight: "bold", fontSize: "1rem",marginTop: "1rem", display: "flex", }}>All products</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
            marginBottom: "3rem",
          }}
        >
        <div style={btnContainer}>
          <div>
            <Link to={"/add-product"}>
              <Button type="primary" icon={<PlusOutlined />}>
                Add product
              </Button>
            </Link>
          </div>
          <div>
            <Link type="primary" to="/admin-users">
              <Button>Users</Button>
            </Link>
            <Link type="primary" to="/admin-orders">
              <Button>Orders</Button>
            </Link>
          </div>
        </div>
        </div>
          <img src={require("../../assets/prod5.png")}/>
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
          dataSource={allProducts}
          renderItem={(item) => (
            
            <List.Item>
              <Link to={"/edit-product/" + item._id}>
                <List.Item.Meta
                  avatar={<Avatar size={64} src={item.img}
                  />}
                  title={
                    <Link to={"/edit-product/" + item._id}>{item.title}</Link>
                  }
                  description={[item.description.split(".")[0]]}
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

const col : CSSProperties = {
  margin: "auto",
  width: "80%"
}

const btnContainer : CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}

const containerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: "8rem",
  textAlign: "center",
};

const editStyle: CSSProperties = {
  color: "red",
  display: "flex",
  justifyContent: "flex-end",
  borderBottom: "1px solid lightgrey",
  alignItems: "center",
};

export default GetAdminList;
