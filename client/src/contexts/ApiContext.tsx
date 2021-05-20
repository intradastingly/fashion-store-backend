import { createContext, useEffect, useState } from "react";

export interface ISession {
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

const userSession: ISession = {
  /* id: "", */
  userName: "",
  password: "",
};

interface State {
  session: ISession;
  allProducts: ProductInfo[];
}

interface ContextValue extends State {
  updateLoginInfo: (userSession: ISession) => void;
  loginHandler: (loginCredentials: ISession, history?: any) => void;
}

export const ApiContext = createContext<ContextValue>({
  session: userSession,
  allProducts: [],
  updateLoginInfo: () => {},
  loginHandler: () => {},
});

interface Props {
  children: Object;
}

function ApiProvider(props: Props) {
  const [formValidation, setUserNameValidation] = useState(false);
  const [session, setSession] = useState<any>();
  const [allProducts, setAllProducts] = useState<any>();

  useEffect(() => {
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
    loadProducts();
  }, []);

  async function loginHandler(loginCredentials: ISession, history: any) {
    const response = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if (result.message === "Incorrect user name or password") {
      setUserNameValidation(true);
    } else {
      setUserNameValidation(false);
    }
    history.push("/profile");
    return response;
  }

  async function updateLoginInfo(loginInfo: ISession) {
    setSession(loginInfo);
    console.log(loginInfo);
  }

  return (
    <ApiContext.Provider
      value={{
        loginHandler: loginHandler,
        updateLoginInfo: updateLoginInfo,
        allProducts: allProducts,
        session: session,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
}

export const ApiConsumer = ApiContext.Consumer;
export default ApiProvider;
