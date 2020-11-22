import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "./component/navigation/Navigation";
import Navigation from "./component/navigation/Navigation";
import Content from "./component/content/Content";

function App() {
  return (
    <Router>
      <header>
        <Navigation/>
      </header>
      <main>
        <Content/>
      </main>
    </Router>
  );
}

export default App;
