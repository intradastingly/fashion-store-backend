import { message } from "antd";
import React, { createContext, useEffect, useState } from "react";
import { CartItem } from "../componenets/Cart/CartItemsList";

export interface Credentials {
  /* id: string, */
  userName: string;
  password: string;
}

interface UserInfo {
  city: String;
  email: String;
  name: String;
  phone: String;
  street: String;
  zipcode: String;
}

export interface Order {
  _id: String;
  cart: CartItem[];
  date: String;
  deliveryMethod: ShippingInfo;
  isHandled: Boolean;
  userInfo: UserInfo;
  totalPrice: Number;
  paymentMethod: {
    phone: String;
  };
  session: {
    userName: String;
    fullName: String;
    phoneNumber: String;
    password: String;
    email: String;
    id: String;
    address: {
      city: String;
      country: String;
      street: String;
      zipCode: Number;
    };
  };
}

export interface registerData {
  userName: String;
  fullName: String;
  phoneNumber: String;
  password: String;
  email: String;
  address: Object;
}

export interface adminRegisterData {
  userName: String;
  fullName: String;
  phoneNumber: String;
  password: String;
  email: String;
  address: Object;
  role: [];
}

export interface ProductInfo {
  category: [];
  description: String;
  quantity: Number;
  title: String;
  img: string;
  price: Number;
  _id: String;
}

export interface AccountInfo {
  address: {
    city: String;
    country: String;
    street: String;
    zipCode: Number;
  };
  userName: String;
  email: String;
  fullName: String;
  phoneNumber: String;
  role: String;
  _id: String;
}
export interface ShippingInfo {
  shipmentCompany: string;
  deliveryTime: number;
  shippingPrice: Number;
  _id: String;
}

export interface Category {
  title: string;
  routeName: string;
  items: ProductInfo[];
}

const userSession: Credentials = {
  /* id: "", */
  userName: "",
  password: "",
};
interface State {
  session: any;
  allProducts: ProductInfo[];
  shippingMethods: ShippingInfo[];
  loggedIn: boolean;
  categories: Category[];
  order: any;
  userCreated: boolean;
  users: AccountInfo[];
  activeUser: AccountInfo;
  orders: any;
  categoryField: any;
  buttonSaveLoading: boolean;
  currentUser: any;
}

interface ContextValue extends State {
  getOrder: (order: any) => void;
  loginHandler: (loginCredentials: Credentials, history?: any) => void;
  logOutHandler: () => void;
  loadProducts: () => void;
  mapCategories: () => void;
  getUserSpecificOrders: (id: string) => void;
  registerHandler: (registerData: registerData) => void;
  updateUserCreated: () => void;
  loadAllUsers: () => void;
  getUser: (id: string) => void;

  saveNewProduct: (image: string) => void;
  titleFieldChange: (e: any) => void;
  descriptionFieldChange: (e: any) => void;
  priceFieldChange: (e: any) => void;
  imageFieldChange: (e: any) => void;
  quantityFieldChange: (e: any) => void;
  handleChange: (categoryField: any) => void;
  saveNewUser: (adminRegisterData: adminRegisterData) => void;
  updatePassword: (id: string, body: object) => void;

  updateUser: (id: string, data: AccountInfo) => void;
}

export const ApiContext = createContext<ContextValue>({
  loggedIn: false,
  session: {},
  allProducts: [],
  users: [],
  shippingMethods: [],
  categories: [],
  order: [],
  userCreated: false,
  activeUser: {} as AccountInfo,
  orders: {},
  categoryField: "",
  buttonSaveLoading: false,
  currentUser: {},
  getOrder: () => {},
  loginHandler: () => {},
  logOutHandler: () => {},
  registerHandler: () => {},
  loadProducts: () => {},
  mapCategories: () => {},
  updateUserCreated: () => {},
  loadAllUsers: () => {},
  getUser: () => {},
  getUserSpecificOrders: (id: string) => {},
  updatePassword: (id: string, body: object) => {},
  saveNewProduct: () => {},
  titleFieldChange: () => {},
  descriptionFieldChange: () => {},
  imageFieldChange: () => {},
  priceFieldChange: () => {},
  quantityFieldChange: () => {},
  handleChange: () => {},
  saveNewUser: () => {},
  updateUser: () => {},
});
export interface shippingMethods extends ShippingInfo {
  shippingMethods: shippingMethods;
}
interface Props {
  children: Object;
}

function ApiProvider(props: Props) {
  const [allProducts, setAllProducts] = useState<any>();
  const [shippingMethods, setShippingMethods] = useState<any>();
  const [session, setSession] = useState<any>(null);
  const [order, setOrder] = useState<any>();
  const [userIsLoggedIn, setuserIsLoggedIn] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [users, setAllUsers] = useState<AccountInfo[]>([]);
  const [activeUser, setActiveUser] = useState<AccountInfo>();
  const [orders, setOrders] = useState();
  const [currentUser, setCurrentUser] = useState<Object>();
  const [buttonSaveLoading, setButtonSaveLoading] = useState(false);
  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [priceField, setPriceField] = useState("");
  const [imageField, setImageField] = useState("");
  const [quantityField, setQuantityField] = useState("");
  const [categoryField, setCategoryField] = useState<any[]>([]);

  useEffect(() => {
    const loadShippingMethods = async () => {
      const result = fetchRequest("/api/shipping", "GET");
      const shipping = await result;
      setShippingMethods(shipping);
    };
    loadProducts();
    loadShippingMethods();
  }, []);

  // useeffect for checking if user is logged in
  useEffect(() => {
    if (session) {
      setuserIsLoggedIn(true);
    } else {
      setuserIsLoggedIn(false);
    }
  });

  //useeffect for authorizing a session
  useEffect(() => {
    const authorizeSession = async () => {
      const result = await fetchRequest(`api/authenticated`, "GET");
      const incomingSession = await result;
      setSession(incomingSession);
    };
    authorizeSession();
  }, []);

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    const result = await fetchRequest("/api/accounts", "GET");
    const users = await result;
    setAllUsers(users);
  };

  const loadProducts = async () => {
    const result = await fetchRequest("/api/products", "GET");

    const products = await result;

    setAllProducts(products);
  };

  const success = () => {
    message.success("The product has been published", 3);
  };

  const handleChange = (categoryField: any) => {
    setCategoryField(categoryField);
  };

  // maps out all categories
  const mapCategories = () => {
    if (allProducts === undefined) {
      return;
    }

    let allProductsCategories: Category[] = [];
    for (const product of allProducts) {
      for (const productCategory of product.category) {
        let selectedCategory = allProductsCategories.find(
          (c) => c.title === productCategory
        );

        if (!selectedCategory) {
          selectedCategory = {
            title: productCategory,
            routeName: productCategory,
            items: [],
          };
          allProductsCategories.push(selectedCategory);
        }

        selectedCategory.items.push(product);
      }
    }
    setCategories(allProductsCategories);
    return;
  };

  // handling function for logging in a user
  async function loginHandler(loginCredentials: Credentials) {
    const result = await fetchRequest("api/login", "POST", loginCredentials);

    if (result === "Incorrect password or username") {
      setuserIsLoggedIn(false);
    } else if (result.message === "Login successful") {
      setSession(result.session);
      setuserIsLoggedIn(true);
      getUser(result.session.id);
    }
    return result;
  }

  // handler for logging out a user
  async function logOutHandler() {
    const result = await fetchRequest("api/logout", "DELETE");

    if (result === "logout succ") {
      setuserIsLoggedIn(false);
      setSession(null);
    } else if (result === "already logged out") {
      setuserIsLoggedIn(false);
    }
    return result;
  }

  // register logic, with full fetch call
  async function registerHandler(registerData: registerData) {
    const result = await fetchRequest("api/accounts", "POST", registerData);

    if (result) {
      setUserCreated(true);
    }
    return result;
  }

  // function for getting one order
  async function getOrder(order: any) {
    setOrder(order);
    createNewOrder(order);
  }

  //logic for getting all orders for specific user from database objectID
  const getUserSpecificOrders = async (id: string) => {
    const result = await fetchRequest(`api/order/${id}`, "GET");
    setOrders(result);
  };

  // create order logic
  async function createNewOrder(order: any) {
    const result = await fetchRequest("api/order", "POST", order);
    setOrder(result);
  }

  // get one user logic
  const getUser = async (id: string) => {
    const result = await fetchRequest(`api/accounts/${id}`, "GET");
    const incomingUser = await result;
    setActiveUser(incomingUser);
  };

  const updatePassword = async (id: string, body: object) => {
    const result = await fetchRequest(`api/accounts/${id}`, "PATCH", body);
  };

  // add new product logic

  const saveNewProduct = async (image: string) => {
    if (
      titleField === "" ||
      descriptionField === "" ||
      quantityField === null ||
      priceField === null
    ) {
      return;
    }
    let body = {
      title: titleField,
      description: descriptionField,
      quantity: quantityField,
      category: categoryField,
      price: priceField,
      img: image,
    };

    const result = await fetchRequest("api/products", "POST", body);
    setButtonSaveLoading(true);

    setTitleField("");
    setDescriptionField("");
    setQuantityField("");
    setPriceField("");
    setImageField("");
    setButtonSaveLoading(false);
    success();
    return result;
  };

  // function for setState when add new product
  const titleFieldChange = (e: any) => {
    setTitleField(e.target.value);
  };
  // function for setState when add new product
  const descriptionFieldChange = (e: any) => {
    setDescriptionField(e.target.value);
  };
  // function for setState when add new product
  const quantityFieldChange = (e: any) => {
    setQuantityField(e.target.value);
  };
  // function for setState when add new product
  const priceFieldChange = (e: any) => {
    setPriceField(e.target.value);
  };
  // function for setState when add new product

  const imageFieldChange = (value: string) => {
    setImageField(value);
  };

  // add new user logic
  const saveNewUser = async (adminRegisterData: adminRegisterData) => {
    const result = await fetchRequest(
      "api/accounts",
      "POST",
      adminRegisterData
    );

    return result;
  };

  const updateUser = async (id: string, data: any) => {
    const result = await fetchRequest(`api/accounts/${id}`, "PUT", data);
    return result;
  };

  const fetchRequest = async (url: string, method: string, body?: any) => {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const content = await response.json();
    return content;
  };

  function updateUserCreated() {
    setUserCreated(false);
  }
  return (
    <ApiContext.Provider
      value={{
        userCreated: userCreated,
        order: order,
        categories: categories,
        activeUser: activeUser!,
        orders: orders,
        loggedIn: userIsLoggedIn,
        allProducts: allProducts,
        session: session,
        shippingMethods: shippingMethods,
        currentUser: currentUser,
        users: users,
        categoryField: categoryField,
        buttonSaveLoading: buttonSaveLoading,
        getOrder: getOrder,
        loginHandler: loginHandler,
        logOutHandler: logOutHandler,
        loadProducts: loadProducts,
        mapCategories: mapCategories,
        registerHandler: registerHandler,
        updateUserCreated: updateUserCreated,
        loadAllUsers: loadAllUsers,
        getUser: getUser,
        getUserSpecificOrders: getUserSpecificOrders,
        saveNewProduct: saveNewProduct,
        titleFieldChange: titleFieldChange,
        descriptionFieldChange: descriptionFieldChange,
        imageFieldChange: imageFieldChange,
        priceFieldChange: priceFieldChange,
        quantityFieldChange: quantityFieldChange,
        handleChange: handleChange,
        updateUser: updateUser,
        saveNewUser: saveNewUser,
        updatePassword: updatePassword,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
}

export const ApiConsumer = ApiContext.Consumer;
export default ApiProvider;
