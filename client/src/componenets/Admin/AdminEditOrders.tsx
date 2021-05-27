import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { RouteComponentProps } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import { Order } from "../../contexts/ApiContext";
import ErrorPage from "../ErrorPage";

interface Props {}
interface Props extends RouteComponentProps<{ id: string }> {}

function AdminEditOrders(props: Props) {
  
  const [allOrders, setAllOrders] = useState<any>();
  const [specificOrder, setSpecificOrder] = useState()
  
  useEffect(() => {
    const loadAllOrders = async () => {
      const response = await fetch("/api/order", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const orders = await response.json();
      setAllOrders(orders);
    };
    loadAllOrders();
    
    
    
  }, []);
  
  
  useEffect(() => {
      
    const findSpecificOrder = () => {
        if(!allOrders){
          return;
        }
        const specific = allOrders.find((order: Order) => (
            order._id === props.match.params.id
        ));

        setSpecificOrder(specific)
     
    }
    
    findSpecificOrder()
    
  }, []);
  

  const changeIsShippedSwitch = async (checked: any) => {
    console.log(`switch to ${checked}`);
    
    let body = {
      isHandled: checked,
    };
    
    const response = await fetch("/api/orders/" + props.match.params.id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const orders = await response.json();
    
    return orders;
  };
  if (allOrders === undefined || specificOrder === undefined) {
    return <LoadingPage />
      
} 
  console.log(specificOrder)
        
  return (
    <div style={{ marginTop: "15rem" }}>
      <Switch onChange={changeIsShippedSwitch} />
    </div>
  );
}

export default AdminEditOrders;
