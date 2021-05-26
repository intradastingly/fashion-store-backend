import { Row, Steps } from "antd";
import {
  Component,
  ContextType,
  CSSProperties,
  useContext,
  useState,
} from "react";
import { ApiContext } from "../../contexts/ApiContext";
import CartItemsList from "./CartItemsList";
import DeliverySelection from "./DeliverySelection";
import InformationForm from "./InformationForm";
import PaymentMethod from "./PaymentMethod";
import { CartContext } from "../../contexts/CartContext";
import CompleteOrder from "./CompleteOrder";

const { Step } = Steps;

const steps = [
  {
    title: "Your information",
  },
  {
    title: "Delivery",
  },
  {
    title: "Payment",
  },
  {
    title: "Complete order",
  },
];

function CartView() {
  const { loggedIn, logOutHandler, session } = useContext(ApiContext);
  const { getTotalPriceProducts } = useContext(CartContext);
  const [current, setCurrent] = useState<number>(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const stepsComponents: any = {
    0: InformationForm,
    1: DeliverySelection,
    2: PaymentMethod,
    3: CompleteOrder,
  };
  const StepsComponent = stepsComponents[current];

  function totalPrice() {
    return getTotalPriceProducts();
  }

  return (
    <Row style={cartViewContainerStyle}>
      <CartItemsList />
      <h3 style={priceTextStyle}>Total Price: {totalPrice() + " kr "}</h3>
      {loggedIn ? (
        <>
          <Steps current={current} style={{ marginTop: "7rem" }}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <StepsComponent next={next} />
        </>
      ) : (
        <div>
          <h3 style={priceTextStyle}>
            Please <a href="/login">log in</a> to proceed to checkout.
          </h3>
        </div>
      )}
    </Row>
  );
}

export default CartView;

const cartViewContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "space-around",
  width: "80%",
  margin: "auto",
  paddingBottom: "8rem",
};

const priceTextStyle: CSSProperties = {
  textAlign: "center",
  marginTop: "1rem",
};
