import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { CSSProperties, useContext, useState, useEffect } from "react";
import "./App.css";
import { ConfigProvider } from "antd";
import AdminEditDetails from "./componenets/Admin/AdminEditDetails";
import AdminList from "./componenets/Admin/AdminList";
import AdminLogIn from "./componenets/Admin/AdminLogIn";
import userLogIn from "./componenets/User/LogIn";
import UserProfile from "./componenets/User/Profile";
import CartView from "./componenets/Cart/CartView";
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
  const [loggedInAsAdmin, setLoggedInAsAdmin] = useState(false);

  function checkIfAdmin() {
    if (loggedIn && session.role === "admin") {
      setLoggedInAsAdmin(true);
      console.log(loggedInAsAdmin);
    }
  }

  useEffect(() => {
    checkIfAdmin();
  });

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

                <Route path="/admin" component={AdminLogIn}>
                  {!loggedInAsAdmin ? <Redirect to="/login" /> : null}
                </Route>

                <Route path="/admin-list" component={AdminList}>
                  {!loggedInAsAdmin ? <Redirect to="/login" /> : null}
                </Route>

                <Route path="/add-product" component={AddNewProduct}>
                  {!loggedInAsAdmin ? <Redirect to="/login" /> : null}
                </Route>

                <Route path="/edit-product/:id" component={AdminEditDetails}>
                  {!loggedInAsAdmin ? <Redirect to="/login" /> : null}
                </Route>

                <Route path="/admin-users" component={AdminUsers}>
                  {!loggedInAsAdmin ? <Redirect to="/login" /> : null}
                </Route>

                <Route path="/edit-user/:id" component={EditUsers}>
                  {!loggedInAsAdmin ? <Redirect to="/login" /> : null}
                </Route>

                <Route path="/admin-orders" component={AdminOrders}>
                  {!loggedInAsAdmin ? <Redirect to="/login" /> : null}
                </Route>
              </Switch>
            </div>
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
