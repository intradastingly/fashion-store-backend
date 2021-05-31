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

const success = () => {
  message.success("The product has been published", 3);
};

function AddNewProduct(props: Props, state: State) {
  const { mapCategories, loadProducts } = useContext(ApiContext);
  const [buttonSaveLoading, setButtonSaveLoading] = useState(false);
  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [priceField, setPriceField] = useState("");
  const [imageField, setImageField] = useState("");
  const [quantityField, setQuantityField] = useState("");
  const [categoryField, setCategoryField] = useState<any[]>([]);
  console.log(imageField)
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

  const handleChange = (categoryField: any) => {
    setCategoryField(categoryField);
  };

  useEffect(() => {
    loadProducts();
    mapCategories();
  }, []);

  const saveNewProduct = async () => {
    setButtonSaveLoading(true);
    saveNewImage()
    let body = {
      title: titleField,
      description: descriptionField,
      quantity: quantityField,
      category: categoryField,
      price: priceField,
      /* img: imageField, */
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

  const saveNewImage = async () => {
    const formData = new FormData()
    formData.append('img', imageField)
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
      headers:{
        "Content-Type": "multipart/form-data; boundary=Row"
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
        
        {/* <input
          name="img"
          onChange={(e: any) => setImageField(e.target.value)}
        /> */}
       
        
        <label>Quantity: </label>
        <input
          name="quantity"
          onChange={(e: any) => setQuantityField(e.target.value)}
        />
        <label>Image: </label>
        
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
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <input 
          type="file" 
          name="img" 
          onChange={(e: any) => setImageField(e.target.files[0])}
        />
        <Button
          type="primary"
          onClick={saveNewProduct}
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
