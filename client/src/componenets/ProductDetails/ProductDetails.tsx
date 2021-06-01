import { Row, Col, message, Button } from "antd";
import React, { CSSProperties, useState, useContext, useEffect } from "react";
import { Image } from "antd";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { Product } from "../ProductItemsList";
import { ApiContext, ProductInfo } from "../../contexts/ApiContext";
import { CartContext } from "../../contexts/CartContext";
import ErrorPage from "../ErrorPage";
import LoadingPage from "../LoadingPage";
interface State {
  product?: ProductInfo;
}
interface Props extends RouteComponentProps {
  id: number;
}
const success = () => {
  message.success("The product was added to the cart", 5);
};
function ProductDetails(props: Props) {
  const { allProducts } = useContext(ApiContext);
  const { addProductToCart } = useContext(CartContext);
  const [product, setProduct] = useState<any>();


  useEffect( () => {

    if(!allProducts) {
      return
    }

    const findAndSetProduct = () => {
      const productId = String((props.match.params as any).id);
      const product = allProducts.find((p: ProductInfo) => p._id === productId);
      setProduct(product);
    }
    findAndSetProduct()

  }, []);

  function handleAddClick() {
    success();
    addProductToCart(product!, undefined);
  } 
  
  return (

    <>
    { !product || !allProducts? (
      <ErrorPage/>
    ) : (
      <Row style={detailContainer}>
        <Col lg={{ span: 10 }} style={columnStyle}>
          <Image src={product?.img} />
        </Col>
  
        <Col lg={{ span: 10 }} style={columnStyle}>
          <h2 style={titleStyle}>{product?.title}</h2>
          <h4>{product?.description} </h4>
          <h2 style={price}>{product?.price + "kr"} </h2>
          {product.quantity < 1 ? <h2>This product is out of stock.</h2> : null}
  
          <Button
            type="primary"
            disabled={product?.quantity <= 0 ? true : false}
            style={{ marginTop: "1rem", width: "8rem", marginBottom: "6rem" }}
            onClick={handleAddClick}
          >
            Add to cart
          </Button>
        </Col>
      </Row>
      
    )

    }
    </>
  );
}

export default withRouter(ProductDetails as any);

const detailContainer: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  width: "80%",
  margin: "auto",
};

const columnStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10rem",
  marginBottom: "5rem",
};

const titleStyle: CSSProperties = {
  fontSize: "2rem",
};

const price: CSSProperties = {
  fontWeight: "bold",
};
