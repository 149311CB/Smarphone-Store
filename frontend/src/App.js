import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <HomeScreen />
      </main>
    </Router>
  );
}

export default App;
