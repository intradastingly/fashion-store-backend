import { Component, createContext, ContextType } from "react";
import { CartItem } from "../componenets/Cart/CartItemsList";
import { UserInfo } from "../componenets/Cart/InformationForm";
import { PaymentCard } from "../componenets/Cart/PayCard";
import { PaymentKlarna } from "../componenets/Cart/PayKlarna";
import { PaymentSwish } from "../componenets/Cart/PaySwish";
import { IReceipt } from "../componenets/OrderSuccess/Reciept";
import { ProductInfo, ApiContext, ShippingInfo } from "../contexts/ApiContext";

const emptyUser: UserInfo = {
  name: "",
  email: "",
  phone: "",
  street: "",
  zipcode: "",
  city: "",
  country: "",
};

export type PaymentMethod = PaymentCard | PaymentSwish | PaymentKlarna;

const defaultPayment: PaymentMethod = {
  cardNumber: "",
  expDate: "",
  cardName: "",
  cvc: "",
};

const emptyReceipt: IReceipt = {
  session: {},
  cart: [],
  deliveryMethod: "",
  totalPrice: 0,
  paymentMethod: defaultPayment,
  userInfo: emptyUser,
};

interface State {
  cart: CartItem[];
  deliveryMethod: any;
  userInfo: UserInfo;
  paymentInfo: PaymentMethod;
  receipt: IReceipt;
  disablePlaceOrderButton: boolean;
}

interface ContextValue extends State {
  addProductToCart: (
    productInfo: ProductInfo,
    quantity: number | undefined
  ) => void;
  setDeliveryMethod: (method: ShippingInfo) => void;
  deleteProductFromCart: (id: number) => void;
  getTotalPrice: () => void;
  getTotalPriceProducts: () => void;
  getBadgeQuantity: () => number;
  updateUserInfo: (userInfo: UserInfo) => void;
  updatePaymentInfo: (paymentInfo: PaymentMethod) => void;
  handlePlaceOrder: (history: any) => void;
}

export const CartContext = createContext<ContextValue>({
  cart: [],
  deliveryMethod: {},
  userInfo: emptyUser,
  paymentInfo: defaultPayment,
  receipt: emptyReceipt,
  disablePlaceOrderButton: false,
  addProductToCart: () => {},
  setDeliveryMethod: () => {},
  deleteProductFromCart: () => {},
  getTotalPrice: () => {},
  getTotalPriceProducts: () => {},
  getBadgeQuantity: () => 0,
  updateUserInfo: () => {},
  updatePaymentInfo: () => {},
  handlePlaceOrder: () => {},
});

class CartProvider extends Component<{}, State> {
  context!: ContextType<typeof ApiContext>;
  static contextType = ApiContext;

  state: State = {
    cart: [],
    deliveryMethod: {},
    userInfo: emptyUser,
    paymentInfo: defaultPayment,
    receipt: emptyReceipt,
    disablePlaceOrderButton: false,
  };

  async componentDidMount() {
    this.setState({
      cart: JSON.parse(localStorage.getItem("cartItems") as string) || [],
    });
  }

  addProductToCart = (product: any, quantity: number | undefined) => {
    let cartItems = this.state.cart;
    const existingCartItem = cartItems.filter(
      (item: any) => item.product._id === product._id
    );
    if (existingCartItem.length === 0) {
      const cartItem = { product: product, quantity: 1 };
      cartItems.push(cartItem);
    } else if (quantity) {
      const cartItem = { product: product, quantity: quantity };
      cartItems = cartItems.map((item: any) =>
        item.product._id === product._id ? cartItem : item
      );
    } else {
      const cartItem = {
        product: product,
        quantity: existingCartItem[0].quantity + 1,
      };
      cartItems = cartItems.map((item: any) =>
        item.product._id === product._id ? cartItem : item
      );
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    this.setState({ cart: cartItems });
    return cartItems;
  };

  setDeliveryMethod = (method: ShippingInfo) => {
    this.setState({ deliveryMethod: method });
  };

  deleteProductFromCart = (id: number) => {
    let cartItems = this.state.cart;
    const newCartItemsList = cartItems.filter(
      (item: CartItem) => item.product._id !== id
    );
    localStorage.setItem("cartItems", JSON.stringify(newCartItemsList));
    this.setState({ cart: newCartItemsList });
  };

  getTotalPriceProducts = () => {
    let cartItems = this.state.cart;
    let totalPriceProducts = cartItems
      .map((item: any) => item.product.price * item.quantity)
      .reduce((a: number, b: number) => a + b, 0);
    return totalPriceProducts;
  };

  getTotalPrice = () => {
    let deliveryPrice = this.state.deliveryMethod?.shippingPrice;
    return this.getTotalPriceProducts() + (deliveryPrice as number);
  };

  getBadgeQuantity = () => {
    let cartItems = this.state.cart;
    let quantity = cartItems
      .map((item: CartItem) => item.quantity)
      .reduce((a: number, b: number) => a + b, 0);
    return quantity;
  };

  updateUserInfo = (userInfo: UserInfo) => {
    this.setState({ userInfo: userInfo });
  };

  updatePaymentInfo = (paymentInfo: PaymentMethod) => {
    this.setState({ paymentInfo: paymentInfo });
  };

  createReceipt = (): IReceipt => {
    const { session } = this.context;
    return {
      session: session,
      cart: this.state.cart,
      userInfo: this.state.userInfo,
      deliveryMethod: this.state.deliveryMethod,
      totalPrice: this.getTotalPrice(),
      paymentMethod: { ...this.state.paymentInfo },
    };
  };

  clearCart = () => {
    this.setState({
      deliveryMethod: this.context.shippingMethods[0],
      cart: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  handlePlaceOrder = async (history: any) => {
    this.setState({ disablePlaceOrderButton: true });
    try {
      await createOrderMockApi();
    } catch (error) {
      return;
    }
    this.setState({
      receipt: this.createReceipt(),
    });

    const { getOrder } = this.context;

    getOrder(this.state.receipt);
    history.push("/ordersuccess");

    this.clearCart();

    this.setState({ disablePlaceOrderButton: false });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          cart: this.state.cart,
          deliveryMethod: this.state.deliveryMethod,
          userInfo: this.state.userInfo,
          paymentInfo: this.state.paymentInfo,
          receipt: this.state.receipt,
          disablePlaceOrderButton: this.state.disablePlaceOrderButton,

          addProductToCart: this.addProductToCart,
          setDeliveryMethod: this.setDeliveryMethod,
          deleteProductFromCart: this.deleteProductFromCart,
          getTotalPrice: this.getTotalPrice,
          getTotalPriceProducts: this.getTotalPriceProducts,
          getBadgeQuantity: this.getBadgeQuantity,
          updateUserInfo: this.updateUserInfo,
          updatePaymentInfo: this.updatePaymentInfo,
          handlePlaceOrder: this.handlePlaceOrder,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;

async function createOrderMockApi() {
  return new Promise((res) => setTimeout(() => res("success"), 2000));
}
