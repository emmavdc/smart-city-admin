import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./navigation.css";
class Navigation extends React.Component {

  handleSignout(event) {
    sessionStorage.clear();
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-expand bg-dark navbar-dark flex-column flex-md-row bd-navbar">
          <Link to="/main/home" className="navbar-brand">
            <img src={logo} alt="Logo" className="logoNav" />
          </Link>
          <ul className="navbar-nav bd-navbar-nav flex-row">
            <li className="nav-item">
              <Link to="/main/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/main/users" className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/main/services" className="nav-link">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/main/evaluations" className="nav-link">
                Evaluations
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav bd-navbar-nav flex-row ml-md-auto">
            <li className="nav-item">
              <a href="/" onClick={this.handleSignout} className="nav-link">
                Déconnexion
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Navigation;
