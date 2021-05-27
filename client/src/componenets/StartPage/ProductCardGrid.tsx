import React, { useContext, CSSProperties, useState, useEffect } from "react";
import { Card, Col, List, Row, message, Menu, Dropdown, Button, Space  } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { ApiContext } from "../../contexts/ApiContext";
import CheckableTag from "antd/lib/tag/CheckableTag";
import useWindowDimensions from "../../windowSize";

const { Meta } = Card;
const success = () => {
  message.success("The product was added to the cart", 5);
};

const tagsData = [
  "All",
  "Dresses",
  "Jeans",
  "Coats",
  "Blazers",
  "T-shirts",
  "Jumpsuits",
  "Trousers",
  "Sweaters",
  "Skirts",
];

function ProductCardGrid() {
  const { addProductToCart } = useContext(CartContext);
  const { allProducts } = useContext(ApiContext);
  const [selectedTags, setSelectedTags] = useState(["All"]);
  const [filteredCategories, setFilteredCategories] = useState<any>();
  const { height, width } = useWindowDimensions();

  const menu = (
    <Menu>
      {tagsData.map(item => (
        <Menu.Item>
          <a 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleClick}
          >{item}</a>
        </Menu.Item>
        )
      )}
    </Menu>
  )
  
  function filterArray(array: any[], filters: any) {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
      // validates all filter criteria
      return filterKeys.every((key) => {
        // ignores non-function predicates
        if (typeof filters[key] !== "function") return true;
        return filters[key](item[key]);
      });
    });
  }

  useEffect(() => {
    if (allProducts) {
      const filter = {
        category: (category: [string]) => {
          for (const c of selectedTags) {
            if (category.includes(c)) return true;
          }
        },
      };
      const filteredObject = filterArray(allProducts, filter);
      setFilteredCategories(filteredObject);
    }
  }, [selectedTags]);

  function handleChange(tag: string, checked: boolean) {
    // const allTagChecked = tag === "All";
    // allTagChecked
    //   ? setSelectedTags(["All"])
    //   :

    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t: string) => t !== tag);

    // A filtered array that does not include the All-tag
    const filteredArray = nextSelectedTags.filter((t: string) => t !== "All");

    // Checks if the array includes the All-tag and if the array is longer than 1.
    if (nextSelectedTags.includes("All") && nextSelectedTags.length > 1) {
      // If it is we will set the state to our filtered array that doesn't include the All-tag
      setSelectedTags(filteredArray);
      //   Then we check if the array is empty
    } else if (nextSelectedTags.length <= 0) {
      // If true we push All to the Array
      setSelectedTags(["All"]);
    } else setSelectedTags(nextSelectedTags);

    // This checks if "All" is added to the array, if the index of "ALl" is more than 1 we set
    // our state to only include the All-tag.
    if (nextSelectedTags.indexOf("All") >= 1) {
      setSelectedTags(["All"]);
    }
  }

  function handleClick(event: any){
    setSelectedTags([event.target.innerHTML])
  }

  return (
    <Row style={cardContainer}>
      <Row style={categoriesContainer}>
        { (width >= 900) ? tagsData.map((tag) => (
          <CheckableTag
            key={tag}
            style={tagStyle}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        )) : 
        <Space direction="vertical">
          <Space wrap>
            <Dropdown 
              overlay={menu}
              placement='bottomRight'
            >
              <Button>Categories</Button>
            </Dropdown>
          </Space>
        </Space>}
      </Row>
      <Col span={24} style={columnStyle}>
        {
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
            dataSource={!filteredCategories ? allProducts : filteredCategories}
            renderItem={(item: any) => (
              <List.Item>
                <Link to={"/product/" + item._id}>
                  <Card
                    hoverable
                    cover={<img src={item.img} alt="product" />}
                    actions={[
                      <ShoppingCartOutlined
                        style={{ fontSize: "2rem" }}
                        onClick={(e) => {
                          success();
                          e.preventDefault();
                          addProductToCart(item, undefined);
                        }}
                      />,
                    ]}
                  >
                    <Meta title={item.title} description={item.price + "kr"} />
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        }
      </Col>
    </Row>
  );
}

export default ProductCardGrid;

const cardContainer: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "space-around",
  width: "80%",
  margin: "auto",
  paddingBottom: "8rem",
};

const categoriesContainer: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "space-around",
  width: "100%",
  margin: "auto",
  paddingTop: "1.1rem",
  marginBottom: "0.5rem",
};

const tagStyle: CSSProperties = {
  fontSize: "1rem",
};

const columnStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
};

