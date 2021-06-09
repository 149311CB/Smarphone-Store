import Header from "./components/header/Header";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import Sidebar from './components/sidebar/Sidebar'
import CartScreen from './screens/CartScreen'
import ProgressBar from './components/ProgressBar'
import CheckoutScreen from './screens/CheckoutScreen'
import AddAddress from './components/AddAddress'
import AddressList from './components/AddressList'
import CheckoutComplete from "./screens/CheckoutComplete";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import Paginations from "./components/Paginations";
import OrderDetails from "./screens/OrderDetails";
import UsersManageScreen from "./screens/admin/UsersManageScreen";
import UserDetailScreen from "./screens/admin/UserDetailScreen";
import AdminOrderScreen from "./screens/admin/AdminOrderScreen";
import AdminOrderDetailsScreen from "./screens/admin/AdminOrderDetailsScreen";
import AdminProductsScreen from "./screens/admin/AdminProductsScreen";
import ProductDetailScreen from "./screens/admin/ProductDetailScreen";
import AddProduct from "./screens/admin/AddProduct";
import AddressScreen from "./screens/AddressScreen";

function App() {
  return (
    <Router>
      <Header />
      <div id="main-container">
        <Route path="/" component={Sidebar} exact />
        <main>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/details/:id" component={ProductScreen} exact />
          <Route path="/cart" component={CartScreen} exact />
          <Route path="/progressbar" component={ProgressBar} exact />
          <Route path="/checkout" component={CheckoutScreen} exact />
          <Route path="/addresses" component={AddressList} exact />
          <Route path="/addresses/add" component={AddAddress} exact />
          <Route path="/checkout/complete/:id" component={CheckoutComplete} exact />
          <Route path="/account/profile" component={ProfileScreen} exact />
          <Route path="/account/orders" component={OrderScreen} exact />
          <Route path={"/component/pagination"} component={Paginations} exact />
          <Route path="/account/orders/:id" component={OrderDetails} exact />
          <Route path="/account/addresses" component={AddressScreen} exact/>
          <Route path="/admin" component={UsersManageScreen} exact/>
          <Route path="/admin/users" component={UsersManageScreen} exact/>
          <Route path="/admin/users/:id" component={UserDetailScreen} exact />
          <Route path="/admin/orders" component={AdminOrderScreen} exact />
          <Route path="/admin/orders/:id" component={AdminOrderDetailsScreen} exact />
          <Route path="/admin/products" component={AdminProductsScreen} exact/>
          <Route path="/admin/products/new" component={AddProduct} exact/>
          <Route path="/admin/products/details/:id" component={ProductDetailScreen} exact/>
        </main>
      </div>
    </Router>
  );
}

export default App;
