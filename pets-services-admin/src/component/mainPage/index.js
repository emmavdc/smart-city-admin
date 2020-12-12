import React from "react";
import ContentPage from "../contentPage";
import Navigation from "../navigation";

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
      </div>
    );
  }
}
export default MainPage;
