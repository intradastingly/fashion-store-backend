import { Button, message, Select, Tag, Popconfirm } from "antd";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { ApiContext, ProductInfo } from "../../contexts/ApiContext";
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
  message.success("The product has been updated", 3);
};

const successDelete = () => {
  message.success("The product has been deleted", 3);
};

function AdminEditDetails(props: Props, state: State) {
  const { allProducts, loadProducts, mapCategories } = useContext(ApiContext);
  const [buttonSaveLoading, setButtonSaveLoading] = useState(false);
  const [buttonDeleteLoading, setButtonDeleteLoading] = useState(false);
  const [editProduct, setEditProduct] = useState<any>({});
  const [titleField, setTitleField] = useState(editProduct.title);
  const [descriptionField, setDescriptionField] = useState(
    editProduct.description
  );
  const [categoryField, setCategoryField] = useState<any[]>([]);
  const [priceField, setPriceField] = useState(editProduct.price);
  const [imageField, setImageField] = useState(editProduct.image);
  const [quantityField, setQuantityField] = useState(editProduct.quantity);
  const [upload, setUpload] = useState<any>()

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

  const saveProduct = async (img: string) => {
    setButtonSaveLoading(true);
   
    const body = {
      title: titleField,
      description: descriptionField,
      quantity: quantityField,
      price: priceField,
      img: img,
      category: categoryField,
    };

    console.log(body)

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

      setEditProduct(product);
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
    loadProducts();
    setButtonDeleteLoading(false);
    successDelete();
    return result;
  };

  if (buttonDeleteLoading || buttonSaveLoading) {
    return <Redirect to="/profile" />;
  }

  if (allProducts === undefined || editProduct === undefined) {
    return <ErrorPage />;
  }

  const saveNewImage = async () => {
    const formData = new FormData()
    formData.append('img', imageField)
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      credentials: 'include',
      headers:{
        "Accept": "multipart/form-data; boundary=Row"
      }
    })
    const imgPath = await response.json();
    console.log(imgPath)
    saveProduct(imgPath)
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
        <label>Quantity: </label>
        <input
          name="quantity"
          required
          onChange={(e: any) => setQuantityField(e.target.value)}
          defaultValue={editProduct.quantity}
        />
        <label> Category: </label>
          <Select
          onChange={handleChange}
          mode="multiple"
          showArrow
          defaultValue={["All"]}
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
        <label>Image: </label>
          <input
            required
            type="file"
            name="img"
            onChange={(e: any) => setImageField(e.target.files[0])}
          />
        <Button
          type="primary"
          onClick={() => {
              saveNewImage()
            }
          }
        >
          Save
        </Button>

        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          onConfirm={handleDelete}
          cancelText="No"
        >
          <Button type="primary" danger loading={buttonDeleteLoading}>
            Delete
          </Button>
        </Popconfirm>
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

export default withRouter(AdminEditDetails);
