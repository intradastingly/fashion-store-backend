import { Component, ContextType, CSSProperties, useContext } from 'react';
import { Card } from 'antd';
import { CartContext, PaymentMethod } from '../../contexts/CartContext';
import { ApiContext } from '../../contexts/ApiContext';
import { UserInfo } from '../Cart/InformationForm';
import { CartItem } from '../Cart/CartItemsList';

export interface IReceipt {
    session: {};
    cart: CartItem[];
    deliveryMethod: string;
    totalPrice: number;
    paymentMethod: PaymentMethod;
    userInfo: UserInfo;
}

function Receipt(){
    const {order} = useContext(ApiContext)
    console.log(order)
   
   /*  for(const p of order){
        console.log(p)
    } */
    return(
        <>
        {/* <Card title="Receipt" style={receiptStyle}>
            <p>Products: {order.map((item: any) => item.quantity + ' ' + item.product.title)}</p>
            <p>Delivery: {order.deliveryMethod}</p>
            <p>Total price: {order.totalPrice + ' kr, incl delivery (VAT: ' + order.totalPrice * 0.25 + ' kr.)'}</p>
        </Card> */}
        </>
    )
}

export default Receipt;

const receiptStyle: CSSProperties = {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5rem'
}