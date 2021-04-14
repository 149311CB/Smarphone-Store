import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <h1>Hello world!</h1>
    </Router>
  );
}

export default App;
