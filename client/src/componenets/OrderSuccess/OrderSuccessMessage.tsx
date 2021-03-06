import { Result, Button, Row, Col } from 'antd';
import { CSSProperties, useContext } from 'react';
import { Link } from 'react-router-dom';
import Reciept from '../OrderSuccess/Reciept';
import { ApiContext } from "../../contexts/ApiContext";

function OrderSuccessMessage() {
    const {order} = useContext(ApiContext)

    if(!order){
        return (
            <Row style={containerStyle}>
            <Col span={24} style={colStyle}>
                <Result
                    status="warning"
                    title="No Order to display"
                    extra={[
                    <Link to='/'>
                        <Button type="primary" key="console">Continue shopping</Button>
                    </Link>
                    ]}
                />
            </Col>
        </Row>
        )
    }

     return (
        <Row style={containerStyle}>
            <Col span={24} style={colStyle}>
                <Result
                    status="success"
                    title="You successfully purchased from FashionStore"
                    subTitle={'Your order number is: ' + order._id}
                    extra={[
                    <Link to='/'>
                        <Button type="primary" key="console">Continue shopping</Button>
                    </Link>
                    ]}
                />
                <Reciept />
            </Col>
        </Row>
    ) 
}

export default OrderSuccessMessage; 

const containerStyle: CSSProperties = {
    margin: 'auto'
}

const colStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10rem',
    marginBottom: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
}