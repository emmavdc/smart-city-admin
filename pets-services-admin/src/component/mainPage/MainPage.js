import React from "react";
import ContentPage from "../contentPage/ContentPage";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

class MainPage extends React.Component {
  render() {

    return (
      <div>
          <header>
             <Navigation></Navigation>
             </header>
          <main>
            <ContentPage></ContentPage>
          </main>
          <footer>
            <Footer></Footer>
          </footer>
      </div>
    );
  }
}
export default MainPage;
