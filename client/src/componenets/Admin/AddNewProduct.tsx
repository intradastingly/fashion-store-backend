import React, { Component, CSSProperties, useState } from "react";
import { Form, Input, InputNumber, Button, Col, Row, message } from "antd";
import { Product } from "../ProductItemsList";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

interface Props extends RouteComponentProps<{ id: string }> {}
interface State {
  product: Product | undefined;
  buttonSaveLoading: boolean;
}

const success = () => {
  message.success("The product has been published", 3);
};

function AddNewProduct(props: Props, state: State) {
  const [buttonSaveLoading, setButtonSaveLoading] = useState(false);
  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [priceField, setPriceField] = useState("");
  const [imageField, setImageField] = useState("");
  const [quantityField, setQuantityField] = useState("");

  const saveNewProduct = async () => {
    setButtonSaveLoading(true);

    let body = {
      title: titleField,
      description: descriptionField,
      quantity: quantityField,
      price: priceField,
      img: imageField,
    };

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = response.json();
    setTitleField("");
    setDescriptionField("");
    setQuantityField("");
    setPriceField("");
    setImageField("");
    setButtonSaveLoading(false);
    success();
    return result;
  };

  return (
    <div style={rootStyle}>
      <form style={layoutStyle}>
        <h2>Add New Product</h2>
        <label>Title: </label>
        <input
          name="title"
          onChange={(e: any) => setTitleField(e.target.value)}
        />
        <label>Description: </label>
        <input
          name="description"
          onChange={(e: any) => setDescriptionField(e.target.value)}
        />
        <label>Price: </label>
        <input
          name="price"
          onChange={(e: any) => setPriceField(e.target.value)}
        />
        <label>Image: </label>
        <input
          name="img"
          onChange={(e: any) => setImageField(e.target.value)}
        />
        <label>Quantity: </label>
        <input
          name="quantity"
          onChange={(e: any) => setQuantityField(e.target.value)}
        />
        <label>Category: </label>
        {/* { editProduct.category.map((c: any) => (

            <input defaultValue={c}/>

 
          ))
            
          } */}

        <Button
          type="primary"
          onClick={saveNewProduct}
          htmlType="submit"
          loading={buttonSaveLoading}
        >
          Save
        </Button>
        <Link to="/admin-list">Back</Link>
      </form>
    </div>
  );
}

const rootStyle: CSSProperties = {
  display: "flex",
  width: "100%",
  height: "100%",
  marginTop: "10rem",
  justifyContent: "center",
  alignItems: "center",
};

const layoutStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "16rem",
};

export default withRouter(AddNewProduct);
