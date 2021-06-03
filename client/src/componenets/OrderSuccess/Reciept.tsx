import { CSSProperties, useContext } from 'react';
import { Card } from 'antd';
import { PaymentMethod } from '../../contexts/CartContext';
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

    if(!order){
        return (
            <Card title="Receipt" style={receiptStyle}>
                <p>No order</p>
            </Card>
        )
    }
    return(
        <>
            <Card title="Receipt" style={receiptStyle}>
                <h3>Products: {order.cart.map((item: any) => <p style={productStyle}>{item.quantity + ' ' + item.product.title}</p>)}</h3>
                <h3>Delivery: {order.deliveryMethod.shipmentCompany}</h3>
                <h3>Total price: {order.totalPrice + ' kr, incl delivery (VAT: ' + order.totalPrice * 0.25 + ' kr.)'}</h3>
            </Card>
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

const productStyle: CSSProperties = {
    paddingLeft: "1rem",
}