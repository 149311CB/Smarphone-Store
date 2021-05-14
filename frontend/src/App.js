import Header from "./components/header/Header";
import {BrowserRouter as Router} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Sidebar from './components/sidebar/Sidebar'

function App() {
  return (
    <Router>
      <Header />
      <div id="main-container">
        <Sidebar />
        <main>
          <HomeScreen />
        </main>
      </div>
    </Router>
  );
}

export default App;
