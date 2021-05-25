import { Button, message, Select, Tag } from "antd";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Link, Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import {ApiContext, ProductInfo } from "../../contexts/ApiContext";
import ErrorPage from "../ErrorPage";
import { Product } from "../ProductItemsList";


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
  const { allProducts, loadProducts, mapCategories } = useContext(ApiContext);
  const [buttonSaveLoading, setButtonSaveLoading] = useState(false);
  const [buttonDeleteLoading, setButtonDeleteLoading] = useState(false);
  const [editProduct, setEditProduct] = useState<any>({});
  const [titleField, setTitleField] = useState(editProduct.title);
  const [descriptionField, setDescriptionField] = useState(editProduct.description);
  const [categoryField, setCategoryField] = useState<any[]>([])
  const [priceField, setPriceField] = useState(editProduct.price);
  const [imageField, setImageField] = useState(editProduct.image);
  const [quantityField, setQuantityField] = useState(editProduct.quantity);

  // tries as defaultValue on Select/option to show current category
  const [productCategory, setProductCategory] = useState<any>()

  const options = [
    { value: "All" },
    { value: "Jumpsuits" },
    { value: "Jeans" },
    { value: "Dresses" },
    { value: 'Coats' },
    { value: 'Trousers' },
    { value: 'Sweaters' },
    { value: 'Skirts' }
  ];
  const filteredOptions = options.filter(o => !categoryField.includes(o))

  const handleChange = (categoryField: any) => {
    setCategoryField(categoryField);
  };

  const tagRender = (props: any) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="blue"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, color: "black" }}
      >
        {label}
      </Tag>
    );
  }


  const saveProduct = async (values: any) => {
    setButtonSaveLoading(true);

    const body = {
      title: titleField,
      description: descriptionField,
      quantity: quantityField,
      price: priceField,
      img: imageField,
      category: categoryField
    };

    const response = await fetch("/api/products/" + props.match.params.id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    setTitleField("");
    setDescriptionField("");
    setQuantityField("");
    setPriceField("");
    setImageField("");
    setButtonSaveLoading(false);
    successSave();
    // api context get all products
    loadProducts();

    

    return result;
  };

  useEffect(() => {
    const loadProducts = async () => {
      if (!allProducts) {
        return;
      }
      const product = await allProducts.find(
        (p: ProductInfo) => p._id === props.match.params.id
      );
      console.log(product?.category, "PRODUCT")
      
      // product?.category.map((c: any) => setProductCategory(c))
      setEditProduct(product);
      setProductCategory([product?.category])
    };
    
    loadProducts();
    mapCategories();
  }, []);

  const handleDelete = async () => {
    setButtonDeleteLoading(true);

    const response = await fetch("/api/products/" + props.match.params.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    // api context get all products
    loadProducts();
    setButtonDeleteLoading(false);
    return result;
  };
  

  if(buttonDeleteLoading || buttonSaveLoading) {
    return <Redirect to="/admin-list" />
  }

  if (allProducts === undefined || editProduct === undefined) {
    return <ErrorPage />;
  }

  return (
    <div style={rootStyle}>
      <form style={layoutStyle}>
        <h2>Edit Product</h2>
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

        <label>Category: {productCategory?.map((p: any) => (<span> {p + " " + categoryField} </span>))}</label>
        <Select
          onChange={handleChange} 
          defaultValue={[ `${productCategory}` ]}
          mode="multiple" 
          showArrow
          value={categoryField}
          tagRender={(props: any) => tagRender(props)}
          style={{ width: "100%" }}
          options={options}
        >
          {filteredOptions.map((item: any) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
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
          onClick={() => {
            handleDelete();
            successDelete();
          }}
          loading={buttonDeleteLoading}
        >
          Delete
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
  alignItems: "center"
};
  
const layoutStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "16rem",
};

export default withRouter(AdminEditDetails);