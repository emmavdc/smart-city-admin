import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ContentPage from "../contentPage/ContentPage";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";
import Signin from "../signin/Signin";

class MainPage extends React.Component {
  render() {

    return (
      <div>
        <Router>
          <Route path="/">
            <Signin></Signin>
          </Route>
          <Route path="/main">
          <header>
             <Navigation></Navigation>
             </header>
          <main>
            <ContentPage></ContentPage>
          </main>
          <footer>
            <Footer></Footer>
          </footer>
          </Route>
        </Router>
      </div>
    );
  }
}
export default MainPage;
