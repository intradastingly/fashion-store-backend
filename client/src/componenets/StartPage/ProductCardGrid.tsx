import React, { useContext, CSSProperties, useState } from 'react';
import { Card, Col, List, Row, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { ProductInfo, ApiContext } from '../../contexts/ApiContext';
import CheckableTag from 'antd/lib/tag/CheckableTag';

const { Meta } = Card;
const success = () => {
    message.success('The product was added to the cart', 5);
};

const tagsData = ["All","Dresses", "Jeans", "Coats", "Blazers", "T-shirts", "Jumpsuits", "Trousers", "Sweaters", "Skirts"]

function ProductCardGrid(){
    const {addProductToCart} = useContext(CartContext);
    const {allProducts, getOrder, loggedIn} = useContext(ApiContext);
    const [selectedTags, setSelectedTags] = useState<any>("All")
    console.log(allProducts)
    console.log(selectedTags)
   
   /*  allProducts.category.map((c:any) => {
        console.log(c)
    }) */

    function handleChange(tag: any,checked: any){
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t: any) => t !== tag);
        setSelectedTags(nextSelectedTags)
    }

        return(
            <Row style={cardContainer}>
                <Row style={categoriesContainer}>
                    {tagsData.map(tag => (
                    <CheckableTag
                        key={tag}
                        style={tagStyle}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={checked => handleChange(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                    ))}
                </Row>
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
                            <List.Item >
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

const categoriesContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '100%',
    margin: 'auto',
    marginTop: '1rem',
    marginBottom: '0.5rem',
}

const tagStyle: CSSProperties = {
    fontSize: "1rem",
}

const columnStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
}