import React from "react";
import { Link } from "react-router-dom";

class Sign extends React.Component {
  render() {
    let signOption = "Connecter";
    return (
      <Link to="/signin" className="nav-link">
        {signOption}
      </Link>
    );
  }
}
export default Sign;
