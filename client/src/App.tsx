import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { CSSProperties, useContext } from "react";
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
import ApiProvider from "./contexts/ApiContext";
import { ApiContext } from "./contexts/ApiContext";
import AdminUsers from "./componenets/Admin/AdminUsers";
import EditUsers from "./componenets/Admin/EditUsers";
import AdminOrders from "./componenets/Admin/AdminOrders";

function App() {
  const { loggedIn, session } = useContext(ApiContext);

  // if (loggedIn) {
  //   return <Redirect to="/profile" />;
  // }

  // <Route exact path="/login" component={userLogIn}>
  //                 {session.userName ? <Redirect to="/profile" /> : null}

  //                 <Route exact path="/profile" component={UserProfile}>
  //                   {!session.userName ? <Redirect to="/" /> : null}
  //                 </Route>
  //               </Route>

  return (
    <ApiProvider>
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
                <Route path="/login" component={userLogIn}>
                  {loggedIn ? <Redirect to="/profile" /> : null}
                </Route>
                <Route path="/profile" component={UserProfile}>
                  {!loggedIn ? <Redirect to="/login" /> : null}
                </Route>
                <Route path="/admin" component={AdminLogIn} />
                <Route path="/admin-list" component={AdminList} />
                <Route path="/add-product" component={AddNewProduct} />
                <Route path="/edit-product/:id" component={AdminEditDetails} />
                <Route path="/admin-users" component={AdminUsers} />
                <Route path="/edit-user/:id" component={EditUsers} />
                <Route path="/admin-orders" component={AdminOrders} />
              </Switch>
            </div>
            <Footer2 />
          </div>
        </Router>
      </CartProvider>
    </ApiProvider>
  );
}

const appContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

export default App;
