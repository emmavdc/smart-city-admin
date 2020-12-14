import React from "react";
import Content from "../content";
import Navigation from "../navigation";

class MainPage extends React.Component {
  render() {

    return (
      <div>
          <header>
             <Navigation></Navigation>
             </header>
          <main>
            <Content></Content>
          </main>
      </div>
    );
  }
}
export default MainPage;
