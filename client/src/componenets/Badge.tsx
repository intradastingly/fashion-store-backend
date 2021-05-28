import { Badge } from "antd";
import { Component, ContextType } from "react";
import { CSSProperties } from "react";
import { CartContext } from "../contexts/CartContext";
import { ShoppingCartOutlined } from "@ant-design/icons";
class AddToBadge extends Component {
  context!: ContextType<typeof CartContext>;
  static contextType = CartContext;

  render() {
    return (
      <CartContext.Consumer>
        {({ getBadgeQuantity }) => {
          return (
            <>
              <ShoppingCartOutlined style={iconStyle} />
              <Badge count={getBadgeQuantity()} style={badgeStyle} />
            </>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

const badgeStyle: CSSProperties = {
  background: "red",
  color: "white",
  borderColor: "red",
  fontSize: "0.8rem",
  marginTop: "1.1rem",
  zIndex: 100,
  position: "absolute",
  bottom: "1rem",
  right: "-8px",
};

const iconStyle: CSSProperties = {
  color: "white",
  fontSize: "2.3rem",
};


export default AddToBadge;
