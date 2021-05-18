import Header from "./components/header/Header";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import Sidebar from './components/sidebar/Sidebar'
import CartScreen from './screens/CartScreen'

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
          <Route patch="/cart" component={CartScreen} exact />
        </main>
      </div>
    </Router>
  );
}

export default App;
