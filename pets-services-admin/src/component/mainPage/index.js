import React from "react";
import ContentPage from "../contentPage";
import Navigation from "../navigation";
import Footer from "../footer";

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
