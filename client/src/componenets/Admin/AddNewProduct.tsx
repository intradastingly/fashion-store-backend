import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Button, message } from "antd";
import { Product } from "../ProductItemsList";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { ApiContext } from "../../contexts/ApiContext";
import { Select, Tag } from "antd";

interface Props extends RouteComponentProps<{ id: string }> {}
interface State {
  product: Product | undefined;
  buttonSaveLoading: boolean;
}



function AddNewProduct(props: Props, state: State) {
  const [imageField, setImageField] = useState<any>({});
  const { mapCategories, 
          loadProducts, 
          saveNewProduct, 
          titleFieldChange,
          quantityFieldChange,
          priceFieldChange,
          imageFieldChange,
          descriptionFieldChange,
          handleChange,
          categoryField,
          buttonSaveLoading } = useContext(ApiContext);

  const options = [
    { value: "All" },
    { value: "Jumpsuits" },
    { value: "Jeans" },
    { value: "Dresses" },
    { value: "Coats" },
    { value: "Trousers" },
    { value: "Sweaters" },
    { value: "Skirts" },
    { value: "T-shirts" },
  ];

  const filteredOptions = options.filter((o) => !categoryField.includes(o));

  useEffect(() => {
    loadProducts();
    mapCategories();
  }, []);
  
  const saveNewImage = async () => {
    const formData = new FormData()
    formData.append('img', imageField)

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
      credentials: 'include',
      headers:{
        "Accept": "multipart/form-data; boundary=Row"
      }
    })
  }


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
  };

  return (
    <div style={rootStyle}>
      <form style={layoutStyle}>
        <h2>Add New Product</h2>
        <label>Title: </label>
        <input
          name="title"
          onChange={titleFieldChange}
          required
        />
        <label>Description: </label>
        <input
          name="description"
          onChange={descriptionFieldChange}
          required
        />
        <label>Price: </label>
        <input
          name="price"
          onChange={priceFieldChange}
          required
        />
        <label>Quantity: </label>
        <input
          name="quantity"
          onChange={quantityFieldChange}
          required
        />
        <label>Category: </label>
        <Select
          onChange={handleChange}
          mode="multiple"
          showArrow
          value={categoryField}
          tagRender={(props: any) => tagRender(props)}
          style={{ width: "100%" }}
          options={options}
        >
          {filteredOptions.map((item: any) => (
            <Select.Option key={item} value={item} required>
              {item}
            </Select.Option>
          ))}
        </Select>
        <label>Image: </label>
        <input 
          type="file" 
          name="img" 
          onChange={(e: any) => setImageField(e.target.files[0])}
        />
        <Button
          type="primary"
          onClick={() => {
            saveNewImage
            saveNewProduct
          }}
          htmlType="submit"
          loading={buttonSaveLoading}
          style={{ marginTop: "1rem" }}
        >
          Save
        </Button>
        <Link to="/profile">Back</Link>
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
