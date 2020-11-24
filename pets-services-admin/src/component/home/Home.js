import React from "react";
import logo from "../../assets/logo.svg"
import "./home.css";
class Home extends React.Component {
  render() {
    return (
      <div className="text-center">
        <img src={logo} alt="Logo" className="logo"/>
      </div>
    );
  }
}
export default Home;
