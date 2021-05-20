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

const userSession: ISession = {
    /* id: "", */
    userName: "",
    password: "",
}
        
  interface State {
    session: ISession;
    allProducts: ProductInfo[];
  }

  interface ContextValue extends State {
    updateLoginInfo: (userSession: ISession) => void;
    getOrder: (order: any) => void
  }
  
  export const ApiContext = createContext<ContextValue>({
    session: userSession,
    allProducts: [],
    updateLoginInfo: () => {},
    getOrder: () => {},
  });
  
  interface Props {
    children: Object;
  }
  
  function ApiProvider(props: Props) {
    const [session, setSession] = useState<any>();
    const [allProducts, setAllProducts] = useState<any>();
    const [order, setOrder] = useState<any>();

    useEffect(() => {
        const loadProducts = async () => {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-type": "application-json"
                }
            })
            const products = await response.json()
            setAllProducts(products)
        }
        loadProducts()
    }, []);

    useEffect(() => {
      const loadGuestSession = async () => {
        console.log('test')
        const response = await fetch("/api/guest", {
          method: "GET"
        })
        const session = await response.json()
        setSession(session)
      } 
      loadGuestSession()
    }, [])
  
    async function updateLoginInfo(loginInfo: ISession){
        /* setSession(loginInfo)
        console.log(loginInfo) */
    }

    async function getOrder(order: any) {
      console.log(order)
      setOrder(order)
    }
  
    return (
      <ApiContext.Provider
        value={{
            updateLoginInfo: updateLoginInfo,
            getOrder: getOrder,
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
  