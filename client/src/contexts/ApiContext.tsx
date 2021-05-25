import React, { createContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
export interface Credentials {
  /* id: string, */
  userName: string;
  password: string;
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
}

interface ContextValue extends State {
  getOrder: (order: any) => void;
  loginHandler: (loginCredentials: Credentials, history?: any) => void;
  logOutHandler: () => void;
  loadProducts: () => void;
  mapCategories: () => void;
}

export const ApiContext = createContext<ContextValue>({
  loggedIn: false,
  session: {},
  currentUser: {},
  allProducts: [],
  shippingMethods: [],
  categories: [],
  order: [],
  getOrder: () => {},
  loginHandler: () => {},
  logOutHandler: () => {},
  loadProducts: () => {},
  mapCategories: () => {},
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

  useEffect(() => {
    const loadShippingMethods = async () => {
      const response = await fetch("/api/shipping", {
        method: "GET",
        headers: {
          "Content-type": "application-json",
        },
      });
      const shipping = await response.json();
      setShippingMethods(shipping);
    };
    loadProducts();
    loadShippingMethods();
  }, []);

  useEffect(() => {
    if (session) {
      setuserIsLoggedIn(true);
    } else {
      setuserIsLoggedIn(false);
    }
  });

  useEffect(() => {
    const authorizeSession = async () => {
      const response = await fetch(`api/authenticated`, {
        method: "GET",
      });

      const incomingSession = await response.json();
      setSession(incomingSession);
    };
    authorizeSession();
  }, []);

  const loadProducts = async () => {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-type": "application-json",
      },
    });
    const products = await response.json();
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

  async function loginHandler(loginCredentials: Credentials) {
    const response = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if (result === "Incorrect password or username") {
      setuserIsLoggedIn(false);
    } else if (result.message === "Login successful") {
      setSession(result.session);
      setuserIsLoggedIn(true);
    }
    return response;
  }

  async function logOutHandler() {
    const response = await fetch("api/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log(result);
    if (result === "logout succ") {
      setuserIsLoggedIn(false);
      setSession(null);
    } else if (result === "already logged out") {
      setuserIsLoggedIn(false);
    }
    return response;
  }

  async function getOrder(order: any) {
    createNewOrder(order);
  }

  async function createNewOrder(order: any) {
    const response = await fetch("api/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const completedOrder = await response.json();
    setOrder(completedOrder)
  }

  return (
    <ApiContext.Provider
      value={{
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
        categories: categories,
        currentUser: currentUser,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
}

export const ApiConsumer = ApiContext.Consumer;
export default ApiProvider;
