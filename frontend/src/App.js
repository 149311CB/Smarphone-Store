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
          <Route path="/addresses/primary" component={AddAddress} exact />
          <Route path="/checkout/complete" component={CheckoutComplete} exact />
        </main>
      </div>
    </Router>
  );
}

export default App;
