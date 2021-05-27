import { Component, ContextType, CSSProperties, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Card, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Route } from 'react-router-dom';

function CompleteOrder(){
    const {cart, deliveryMethod, getTotalPrice, disablePlaceOrderButton, handlePlaceOrder } = useContext(CartContext);

    const onPlaceOrderClick = (history: any) => {
        handlePlaceOrder(history);
    }

    return (
        <>
        <Col span={24} style={buttonContainerStyle}>
            <Card title="Order summary" style={{ width: '80%', marginTop: '7rem' }}>
                <h3>Products: {cart.map((item) => <p style={productStyle}>{item.quantity + ' ' + item.product.title}</p>)}</h3>
                <h3>Delivery: {deliveryMethod.shipmentCompany}</h3>
                <h3>Total price: {getTotalPrice() + ' kr, incl delivery and VAT'}</h3>
            </Card>
        </Col>
        <Col span={24} style={buttonContainerStyle}>
            <Route render={({ history }) => (
                <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    size={'large'}
                    onClick={() => onPlaceOrderClick(history)}
                    loading={disablePlaceOrderButton}
                >
                    <strong> Place order</strong>
                </Button>
            )}/>
        </Col>
        </>
    );    
}           

export default CompleteOrder;

const buttonContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-3rem',
    marginBottom: '8rem'
}

const productStyle: CSSProperties = {
    paddingLeft: "1rem",
}