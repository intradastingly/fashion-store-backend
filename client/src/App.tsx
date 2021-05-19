import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSProperties } from "react";
import "./App.css";
import AdminEditDetails from "./componenets/Admin/AdminEditDetails";
import AdminList from "./componenets/Admin/AdminList";
import AdminLogIn from "./componenets/Admin/AdminLogIn";
import userLogIn from "./componenets/User/logIn";
import UserProfile from "./componenets/User/profile";
import CartView from "./componenets/Cart/CartView";
import Footer2 from "./componenets/Footer";
import Navbar from "./componenets/Navbar";
import OrderSuccessMessage from "./componenets/OrderSuccess/OrderSuccessMessage";
import ProductDetails from "./componenets/ProductDetails/ProductDetails";
import StartPageView from "./componenets/StartPage/StartPageView";
import CartProvider from "./contexts/CartContext";
import ScrollToTop from "./componenets/ScrollToTop";
import AddNewProduct from "./componenets/Admin/AddNewProduct";

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div style={appContainer}>
          <div>
            <Navbar />
          </div>
          <div>
            <Switch>
              <Route path="/product/:id" component={ProductDetails} />
              <Route path="/ordersuccess" component={OrderSuccessMessage} />
              <Route exact path="/" component={StartPageView} />
              <Route path="/cart" component={CartView} />
              <Route path="/login" component={userLogIn} />
              <Route path="/profile" component={UserProfile} />
              <Route path="/admin" component={AdminLogIn} />
              <Route path="/admin-list" component={AdminList} />
              <Route path="/add-product" component={AddNewProduct} />
              <Route path="/edit-product/:id" component={AdminEditDetails} />
            </Switch>
          </div>
          <Footer2 />
        </div>
      </Router>
    </CartProvider>
  );
}

const appContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

export default App;
