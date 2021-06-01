import { Row, Steps } from "antd";
import {
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
import { useMediaQuery } from "react-responsive";
import useWindowDimensions from "../../windowSize";


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
  const { loggedIn} = useContext(ApiContext);
  const { getTotalPriceProducts, cart } = useContext(CartContext);
  const [current, setCurrent] = useState<number>(0);
  const { width } = useWindowDimensions();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 740px)" });

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

  if (cart.length === 0) {
    return (
      <Row style={cartViewContainerStyle}>
        <CartItemsList />
        <div>
          <h3 style={priceTextStyle}>
            Nothing in cart. <a href="/"> Go back</a>
          </h3>
        </div>
      </Row>
    );
  }

  return (
    <Row style={cartViewContainerStyle}>
      <CartItemsList />
      <h3 style={priceTextStyle}>Total Price: {totalPrice() + " kr "}</h3>
      {loggedIn ? (
        <>
          <div style={stepperContainer}>
            <Steps
              direction={isTabletOrMobile ? "vertical" : "horizontal"}
              size={isTabletOrMobile ? "small" : "default"}
              current={current}
              style={
                isTabletOrMobile ? stepperContainerMobile : stepperContainer
              }
            >
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div>
              <StepsComponent next={next} />
            </div>
          </div>
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

const stepperContainerMobile: CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  textAlign: "center",
  width: "100%",
};

const stepperContainer: CSSProperties = {
  marginTop: "2rem",
};
