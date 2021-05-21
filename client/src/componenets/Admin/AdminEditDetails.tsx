import { Form, Input, Button, Col, Row, message } from "antd";
import { Component, CSSProperties, useContext, useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {ApiContext} from "../../contexts/ApiContext";
import ErrorPage from "../ErrorPage";
import { Product, productList } from "../ProductItemsList";

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
  products: Product[];
  product: Product | undefined;
  buttonSaveLoading: boolean;
  buttonDeleteLoading: boolean;
}

const successSave = () => {
  message.success('The product has been updated', 3);
};

const successDelete = () => {
  message.success('The product has been deleted', 3);
};

function AdminEditDetails(props: Props, state: State){
  const { allProducts } = useContext(ApiContext);
  const [buttonSaveLoading, setButtonSaveLoading] = useState(false)
  const [buttonDeleteLoading, setButtonDeleteLoading] = useState(false)
  const [editProduct, setEditProduct] = useState<any>({})
  



  const onFinish = async (values: any) => {

    setButtonSaveLoading(true)
   
    try {
      await saveDeleteProductMockApi();
    } catch (error) {
        console.log(error);
        return;
    }
    // const products = allProducts
    // const editedProduct: Product = {...products, ...values.product};
    // const updatedProducts = products.map((item: any) => item._id === editedProduct.id ? editedProduct : item);
    // localStorage.setItem('products', JSON.stringify(updatedProducts));
    // props.history.push('/admin-list');
  
    
    // const body = {
    //   title: req.body.title,
    //   description: req.body.description,
    //   category: req.body.category,
    //   quantity: req.body.quantity,
    //   price: req.body.price,
    //   img: req.body.img
    // }

    // const response = await fetch("/api/products/" + props.match.params.id, {
    //   method: "PUT",
    //   body: JSON.stringify(body),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })

    
    setButtonSaveLoading(false)
    
  }

  useEffect( () => {

    const loadProducts = async () => {
      const product = await allProducts.find((p: any) => p._id === props.match.params.id);
      setEditProduct({product})
    }

    loadProducts();

    },[])
    

  const handleDelete = async () => {
    setButtonDeleteLoading(true)
    try {
      await saveDeleteProductMockApi();
    } catch (error) {
        console.log(error);
        return;
    }
    // const products = JSON.parse(localStorage.getItem('products') as string) || [];
    // const productId = this.state.product?.id;
    // const newProducts = products.filter((item: Product) => item.id !== productId);
    // localStorage.setItem('products', JSON.stringify(newProducts));
    // this.props.history.push('/admin-list');
    // this.setState({ buttonDeleteLoading: false });
  }
  
  
  console.log(editProduct.product.title)
  console.log(allProducts)
    return (
      <div>
        <Row style={ContainerStyle}>
          <Col span={24} style={columnStyle}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
              // initialValues={{
              //   product: {
              //     //title: editProduct.title,
              //     //description: editProduct.description,
              //     // price: editProduct.price,
              //     // imageUrl: editProduct.img,
              //     // category: editProduct.category,
              //     // quiantity: editProduct.quiantity,
              //   }
              // }}
            >
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                EDIT
              </h1>
              <Form.Item name={["product", "title"]} label="Title" rules={[{ required: true }]}>
                <Input  />
              </Form.Item>

              <Form.Item name={["product", "description"]} label="Description" rules={[{ required: true }]}>
                <Input.TextArea defaultValue="{editProduct?.}"/>
              </Form.Item>

              <Form.Item name={["product", "price"]} label="Price" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              
              <Form.Item name={["product", "imageUrl"]} label="ImageUrl" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button 
                    type="primary"
                    onClick={() => {successSave();}} 
                    htmlType="submit" 
                    loading={buttonSaveLoading}
                  >
                    Save
                  </Button>

                  <Button 
                    type="primary" 
                    danger 
                    onClick={() => {handleDelete(); successDelete();}} 
                    loading={buttonDeleteLoading}
                  >
                    Delete
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
}

const ContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "space-around",
  width: "70%",
  margin: "auto",
};

const columnStyle: CSSProperties = {
  marginTop: "10rem",
  paddingBottom: "8rem",
};

export default withRouter(AdminEditDetails);

async function saveDeleteProductMockApi() {
  return new Promise((res) => setTimeout(() => res("success"), 2000));
}