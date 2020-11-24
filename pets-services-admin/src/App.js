import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "./component/navigation/Navigation";
import Navigation from "./component/navigation/Navigation";
import Content from "./component/content/Content";
import Footer from "./component/footer/Footer";

function App() {
  return (
    <Router>
      <header>
        <Navigation/>
      </header>
      <main>
        <Content/>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </Router>
  );
}

export default App;
