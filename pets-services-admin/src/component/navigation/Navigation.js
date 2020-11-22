import React from "react";
import { Link } from "react-router-dom";
class Navigation extends React.Component {

  render() {

    return (
        <nav className="navbar navbar-expand bg-dark navbar-dark flex-column flex-md-row bd-navbar">
        <a className="navbar-brand" href="/">
          Logo
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
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
    );
  }

}
export default Navigation;