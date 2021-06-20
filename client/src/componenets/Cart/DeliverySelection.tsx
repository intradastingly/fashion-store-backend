import { Button, Form, Radio, Row } from "antd";
import {
  CSSProperties,
  useContext,
} from "react";
import { CartContext } from "../../contexts/CartContext";
import { ApiContext, ShippingInfo } from "../../contexts/ApiContext";
import { calculateDeliveryDay } from "../deliveryMethods";
interface Props {
  next(): void;
}

function DeliverySection(props: Props) {
  const { shippingMethods } = useContext(ApiContext);
  const { setDeliveryMethod } = useContext(CartContext);


  const onChange = (e: any) => {
    const method = e.target.value;
    setDeliveryMethod(method);
};

  const onFinish = (values: ShippingInfo) => {
    console.log('Success:', values);
    props.next();
};

  const mapMethodToRadio = () => {
          return shippingMethods.map((item) => (
              <Radio
                  value={item}
                  style={{ marginTop: '2rem' }}>

                  <span style={deliveryCompanyStyle}>
                      {item.shipmentCompany}
                  </span>
                  <br />
                  <span style={deliveryTextStyle}>
                      {'Delivery on ' +
                          calculateDeliveryDay(item.deliveryTime)}
                  </span>
                  <br />
                  <span style={deliveryTextStyle}>
                      {item.shippingPrice + ' kr '}
                  </span>
              </Radio>
          ))
  };

  return (
      <Row style={deliveryContainer}>
          <h2>Delivery</h2>
          <Form onFinish={onFinish}>
              <Form.Item name='Delivery Option' rules={[{ required: true }]}>
                  <Radio.Group onChange={onChange}>
                    {mapMethodToRadio()}
                  

                  </Radio.Group>
              </Form.Item>
              <Button type='primary' htmlType='submit' style={buttonStyle}>
                  Next
              </Button>
          </Form>
          <br />
      </Row>
  );
}


export default DeliverySection;

const deliveryContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "90%",
  margin: "auto",
  paddingTop: "3rem",
  paddingBottom: "3rem",
};

const buttonStyle: CSSProperties = {
  marginTop: "3rem",
  width: "4rem",
};

const deliveryTextStyle: CSSProperties = {
  marginTop: "1rem",
  marginRight: "4rem",
  color: "#666666",
};

const deliveryCompanyStyle: CSSProperties = {
  fontWeight: "bold",
};
