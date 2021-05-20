import { createContext, useEffect, useState } from "react";

export interface ISession {
    /* id: string, */
    userName: string,
    password: string,
}

export interface ProductInfo {
    category: [],
    description: String,
    quantity: Number,
    title: String,
    img: string,
    price: Number,
    _id: String
}

export interface ShippingInfo {
  shipmentCompany: string,
  deliveryTime: number,
  shippingPrice: Number,
  _id: String
}

const userSession: ISession = {
    /* id: "", */
    userName: "",
    password: "",
}
        
  interface State {
    session: ISession;
    allProducts: ProductInfo[];
    shippingMethods: ShippingInfo[];
    //method: string;
    // setShippingMethod: ShippingInfo[];

  }

  interface ContextValue extends State {
    updateLoginInfo: (userSession: ISession) => void;
  }
  
  export const ApiContext = createContext<ContextValue>({
    session: userSession,
    allProducts: [],
    shippingMethods: [],
    // method: "",
    updateLoginInfo: () => {},
  });
  
  export interface shippingMethods extends ShippingInfo {
    shippingMethods: shippingMethods
  }

  interface Props {
    children: Object;
  }
  
  function ApiProvider(props: Props) {
    const [session, setSession] = useState<any>();
    const [allProducts, setAllProducts] = useState<any>();
    const [shippingMethods, setShippingMethods] = useState<any>();
    // const [method, setShippingMethod] = useState<any>("");

    useEffect(() => {
        const loadProducts = async () => {
            const response = await fetch("/api/products", {
                method: "GET",
                headers: {
                    "Content-type": "application-json"
                }
            })
            const products = await response.json()
            setAllProducts(products)
        }
        loadProducts()

        const loadShippingMethods = async () => {
          const response = await fetch("/api/shipping", {
            method: "GET",
            headers: {
              "Content-type": "application-json"
            }
          })

          const shipping = await response.json();
          setShippingMethods(shipping)
        }
        loadShippingMethods()
    }, []);
  
    async function updateLoginInfo(loginInfo: ISession){
        setSession(loginInfo)
    }
  
    return (
      <ApiContext.Provider
        value={{
          allProducts: allProducts,
          session: session,
          shippingMethods: shippingMethods,
          // method: method,
          // setShippingMethod: setShippingMethod,
          updateLoginInfo: updateLoginInfo,

        }}
      >
        {props.children}
      </ApiContext.Provider>
    );
  }
  
  export const ApiConsumer = ApiContext.Consumer;
  export default ApiProvider;
  