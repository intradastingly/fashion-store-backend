import { Form, Input, Button, Col, Row, message } from "antd";
import React, { Component, CSSProperties, useContext, useEffect, useState } from "react";
import { Link, Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import {ApiContext, ProductInfo} from "../../contexts/ApiContext";
import ErrorPage from "../ErrorPage";
import { Product, productList } from "../ProductItemsList";

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };

/* eslint-disable no-template-curly-in-string */
// const validateMessages = {
//   required: "${label} is required!",
//   types: {
//     email: "${label} is not a valid email!",
//     number: "${label} is not a valid number!",
//   },
//   number: {
//     range: "${label} must be between ${min} and ${max}",
//   },
// };

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
  const [redirect, setRedirect ] = useState(false)
  const [editProduct, setEditProduct] = useState<any>({})
  const [titleField, setTitleField] = useState(editProduct.title)
  const [descriptionField, setDescriptionField ] = useState(editProduct.description)
  const [priceField, setPriceField ] = useState(editProduct.price)
  const [imageField, setImageField ] = useState(editProduct.image)
  const [quantityField, setQuantityField ] = useState(editProduct.quantity)
  



  const saveProduct = async (values: any) => {

    setButtonSaveLoading(true)
   
    // try {
    //   await saveDeleteProductMockApi();
    // } catch (error) {
    //     console.log(error);
    //     return;
    // }
    // const products = allProducts
    // const editedProduct: Product = {...products, ...values.product};
    // const updatedProducts = products.map((item: any) => item._id === editedProduct.id ? editedProduct : item);
    // localStorage.setItem('products', JSON.stringify(updatedProducts));
    // props.history.push('/admin-list');
  
    
    const body = {
      title: titleField,
      description: descriptionField,
      quantity: quantityField,
      price: priceField,
      img: imageField
    }

    const response = await fetch("/api/products/" + props.match.params.id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const result = await response.json()
    
    setTitleField("")
    setDescriptionField("")
    setQuantityField("")
    setPriceField("")
    setImageField("")
    setRedirect(true)
    setButtonSaveLoading(false)
    successSave()

    return result
  }

  useEffect( () => {

    const loadProducts = async () => {
      if(!allProducts){
        return
      }
      console.log(allProducts)
      const product = await allProducts.find((p: ProductInfo) => p._id === props.match.params.id);
      console.log(product)
      setEditProduct(product)
    }

    loadProducts();
    },[])
    

  const handleDelete = async () => {
    setButtonDeleteLoading(true)
    // try {
    //   await saveDeleteProductMockApi();
    // } catch (error) {
    //     console.log(error);
    //     return;
    // }
    // const products = JSON.parse(localStorage.getItem('products') as string) || [];
    // const productId = this.state.product?.id;
    // const newProducts = products.filter((item: Product) => item.id !== productId);
    // localStorage.setItem('products', JSON.stringify(newProducts));
    // this.props.history.push('/admin-list');
    // this.setState({ buttonDeleteLoading: false });
  }


  if(redirect === true) {
    return <Redirect to="/admin-list" />
  }

  console.log(redirect)
  
  if(allProducts === undefined || editProduct === undefined) {
    return <ErrorPage />
  }
  

  //console.log(editProduct.category)
  //console.log(editProduct.category.map((p: any) => console.log(p)))
  //editProduct.category.map((p: any) => console.log(p))
    return (
      
      <div style={ContainerStyle}>
        <form>
          <label>Title: </label>
          <input
            name="title"
            onChange={(e: any) => setTitleField(e.target.value)}
            defaultValue={editProduct.title}
            />
          <label>Description: </label>
          <input
            name="description"
            onChange={(e: any) => setDescriptionField(e.target.value)}
            defaultValue={editProduct.description}
            />         
          <label>Price: </label>
          <input
            name="price"
            onChange={(e: any) => setPriceField(e.target.value)}
            defaultValue={editProduct.price}
            
            />
          <label>Image: </label>
          <input
            name="img"
            onChange={(e: any) => setImageField(e.target.value)}
            defaultValue={editProduct.img}
            />
          <label>Quantity: </label>
          <input
            name="quantity"
            onChange={(e: any) => setQuantityField(e.target.value)}
            defaultValue={editProduct.quantity}
            />
          <label>Category: </label>
          {/* { editProduct.category.map((c: any) => (

            <input defaultValue={c}/>

 
          ))
            
          } */}


            <Button 
              type="primary"
              onClick={saveProduct}
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
            <Link to="/admin-list">Back</Link>
          </form>
      </div>
    );
}

const ContainerStyle: CSSProperties = {
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "space-around",
  width: "70%",
  marginTop: "10rem",

};

const columnStyle: CSSProperties = {
  marginTop: "10rem",
  paddingBottom: "8rem",
};

export default withRouter(AdminEditDetails);

// async function saveDeleteProductMockApi() {
//   return new Promise((res) => setTimeout(() => res("success"), 2000));
// }