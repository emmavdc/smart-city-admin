import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./navigation.css";
class Navigation extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand bg-dark navbar-dark flex-column flex-md-row bd-navbar">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Logo" className="logoNav"/>
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/evaluations" className="nav-link">
                Evaluations
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Navigation;
