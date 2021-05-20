import { Component, useContext, CSSProperties } from 'react';
import { Card, Col, List, Row, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Product } from '../ProductItemsList';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { ProductInfo, ApiContext } from '../../contexts/ApiContext';

const { Meta } = Card;
const success = () => {
    message.success('The product was added to the cart', 5);
};

function ProductCardGrid(){
    const {addProductToCart} = useContext(CartContext);
    const {allProducts} = useContext(ApiContext);
    
    const products: Product[] = JSON.parse(localStorage.getItem("products") as string) || [];

        return(    
            <Row style={cardContainer}>
                <Col span={24} style={columnStyle}>
                    <List
                       grid={{
                            gutter: 25,
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 4,
                            xl: 4,
                            xxl: 4,
                        }}
                        dataSource={allProducts}
                        renderItem={item => (
                            <List.Item>
                                {console.log(item._id)}
                                <Link to={'/product/' + item._id}>
                                    <Card
                                        hoverable
                                        cover={<img src={item.img} alt='product' />}
                                        actions={[
                                            <ShoppingCartOutlined 
                                                style={{ fontSize: '2rem' }}
                                                onClick={(e) => {success(); e.preventDefault(); addProductToCart(item, undefined)}} 
                                            />
                                        ]}
                                    >
                                    <Meta title={item.title} description={item.price + "kr"} />
                                    </Card>
                                </Link>
                            </List.Item>
                        )}    
                    />
                </Col>
            </Row>
        )
   
}

export default ProductCardGrid;

const cardContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    margin: 'auto',
    paddingBottom: '8rem',
}

const columnStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3rem',
}