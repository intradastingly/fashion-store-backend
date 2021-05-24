import { createContext, useEffect, useState } from "react";
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

const userSession: Credentials = {
  /* id: "", */
  userName: "",
  password: "",
};
interface State {
  session: Credentials;
  allProducts: ProductInfo[];
  shippingMethods: ShippingInfo[];
  loggedIn: boolean;
}

interface ContextValue extends State {
  getOrder: (order: any) => void;
  loginHandler: (loginCredentials: Credentials, history?: any) => void;
  logOutHandler: () => void;
  loadProducts: () => void;
}

export const ApiContext = createContext<ContextValue>({
  loggedIn: false,
  session: userSession,
  allProducts: [],
  shippingMethods: [],
  getOrder: () => {},
  loginHandler: () => {},
  logOutHandler: () => {},
  loadProducts: () => {},
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
  const [session, setSession] = useState<any>();
  const [order, setOrder] = useState<any>();
  const [userIsLoggedIn, setuserIsLoggedIn] = useState<boolean>(false);

  console.log(session)

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
    const authorizeSession = async () => {
      const response = await fetch(`api/authenticated`, {
        method: "GET",
      });
      const session = await response.json();
      setSession(session);
      console.log(session);
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

  async function loginHandler(loginCredentials: Credentials) {
    const response = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if (result === "Incorrect password or username") {
      setuserIsLoggedIn(false);
    } else if (result.message === "Login Succesful") {
      setSession(result.session)
      setuserIsLoggedIn(true);
      console.log("User is now logged in");
      console.log(userIsLoggedIn);
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
    } else if (result === "already logged out") {
      setuserIsLoggedIn(false);
    }
    return response;
  }

  async function getOrder(order: any) {
    console.log(order);
    setOrder(order);
    createNewOrder(order);
  }

  async function createNewOrder(order: any) {
    const response = await fetch("api/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
  }
  return (
    <ApiContext.Provider
      value={{
        loggedIn: userIsLoggedIn,
        allProducts: allProducts,
        session: session,
        shippingMethods: shippingMethods,
        getOrder: getOrder,
        loginHandler: loginHandler,
        logOutHandler: logOutHandler,
        loadProducts: loadProducts,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
}

export const ApiConsumer = ApiContext.Consumer;
export default ApiProvider;
