import React from "react";
import { Link } from "react-router-dom";
class OptionsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      email: "",
      locality: "",
      callback: props.callback,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  handleSearch(event) {
    this.state.callback({
      lastname: this.state.lastname,
      email: this.state.email,
      locality: this.state.locality,
    });
  }

  render() {
    return (
      <div className="btn-toolbar justify-content-between" role="toolbar">
        <div className="input-group" role="group">
          <input
            id="inputName"
            placeholder="Nom"
            type="text"
            name="lastname"
            onChange={this.handleChange}
          ></input>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          ></input>
          <input
            type="text"
            placeholder="Localité"
            name="locality"
            onChange={this.handleChange}
          ></input>
          <input
            type="button"
            onClick={this.handleSearch}
            className="btn btn-primary"
            value="Chercher"
          ></input>
        </div>
        <div className="btn-group" role="group">
            <Link to="/main/users/add" className="btn btn-primary">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-person-plus-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                ></path>
              </svg>
            </Link>
        </div>
      </div>
    );
  }
}
export default OptionsBar;
