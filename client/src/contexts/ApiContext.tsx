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

export interface ProductInfo {
  category: [];
  description: String;
  quantity: Number;
  title: String;
  img: string;
  price: Number;
  _id: String;
}

export interface userInfo {
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
  currentUser: any;
  allProducts: ProductInfo[];
  shippingMethods: ShippingInfo[];
  loggedIn: boolean;
  categories: Category[];
  order: any;
  userCreated: boolean;
  users: userInfo[];
  activeUser: any;
  orders: any;
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
}

export const ApiContext = createContext<ContextValue>({
  loggedIn: false,
  session: {},
  currentUser: {},
  allProducts: [],
  users: [],
  shippingMethods: [],
  categories: [],
  order: [],
  userCreated: false,
  activeUser: {},
  orders: {},
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
  const [currentUser, setCurrentUser] = useState<Object>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [users, setAllUsers] = useState<userInfo[]>([]);
  const [activeUser, setActiveUser] = useState();
  const [orders, setOrders] = useState();

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
      getUser(session.id);
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

    if (result.status === 201) {
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

  // get one user logic [CURRENTLY UNUSED!!]
  const getUser = async (id: string) => {
    const response = await fetch(`api/accounts/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application-json",
      },
    });
    const incomingUser = await response.json();

    setActiveUser(incomingUser);
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

        loggedIn: userIsLoggedIn,
        allProducts: allProducts,
        session: session,
        shippingMethods: shippingMethods,
        getOrder: getOrder,
        loginHandler: loginHandler,
        logOutHandler: logOutHandler,
        loadProducts: loadProducts,
        mapCategories: mapCategories,
        registerHandler: registerHandler,
        updateUserCreated: updateUserCreated,
        categories: categories,
        currentUser: currentUser,
        users: users,
        activeUser: activeUser,
        orders: orders,
        loadAllUsers: loadAllUsers,
        getUser: getUser,
        getUserSpecificOrders: getUserSpecificOrders,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
}

export const ApiConsumer = ApiContext.Consumer;
export default ApiProvider;
