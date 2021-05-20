import { Button, Radio, Row } from 'antd';
import { Component, ContextType, CSSProperties, useState, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { ApiContext, ShippingInfo } from '../../contexts/ApiContext';
import { calculateDeliveryDay } from '../deliveryMethods';
interface Props {
  next(): void;
}


function DeliverySection(props: Props) {
  const { shippingMethods } = useContext(ApiContext)
  const { setDeliveryMethod } = useContext(CartContext)

  const [value, setValue] = useState(1)

  
  const onChange = (e: any) => {
    setValue(e.target.value)

    const method = shippingMethods.filter((item: ShippingInfo) => item._id === e.target.value)[0];
    console.log("METHOD FILTER", method)
    //setShippingMethod(method);
    setDeliveryMethod(method)
  };

  const mapMethodToRadio = () => {
    return shippingMethods.map(item =>
      <Radio value={item._id} style={{ marginTop: '2rem' }}>
        <span style={deliveryCompanyStyle}>{item.shipmentCompany}</span>
        <br/>
        <span style={deliveryTextStyle}>{'Delivery on ' + calculateDeliveryDay(item.deliveryTime)}</span>
        <br/>
        <span style={deliveryTextStyle}>{item.shippingPrice + ' kr '}</span>
      </Radio>
    );
  }



    return (
      <Row style={deliveryContainer}>
          <h2>
              Delivery
          </h2>
          <Radio.Group onChange={onChange} value={value}>
            {mapMethodToRadio()}
          </Radio.Group>
          <br/>
          <Button type="primary" style={buttonStyle} onClick={props.next}>
            Next
          </Button>
      </Row>
    );
  
}

export default DeliverySection;

const deliveryContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  margin: 'auto',
  paddingTop: '3rem',
  paddingBottom: '3rem'
}

const buttonStyle: CSSProperties = {
  marginTop: '3rem',
  width: '4rem'
}

const deliveryTextStyle: CSSProperties = {
  marginTop: '1rem',
  marginRight: '4rem',
  color: '#666666',
}

const deliveryCompanyStyle: CSSProperties = {
  fontWeight: 'bold',
}