import React from "react";
import "./signin.css";
import logo from "../../assets/logo.svg";
import { Redirect } from "react-router-dom";

class Signin extends React.Component {

  constructor() {
    super();
    this.state = { email: "", password: "", errorMessage: "", redirectAfterLogin: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  handleSubmit(event) {

    const signInData = {
      password: this.state.password,
      email: this.state.email
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInData)
    };
    fetch('http://localhost:5000/users/actions/login', requestOptions)
        .then(response => response.text())
        .then(data => {
          sessionStorage.setItem("jwt", data);
          this.setState({redirectAfterLogin: true});
        });
    event.preventDefault();
  }

  render() {

    const { redirectAfterLogin } = this.state;

    if (redirectAfterLogin) {
      return <Redirect to="/main/home"/>;
    }

    return (
      <div className="text-center">
        <img className="mb-4" src={logo} alt="" width="300" height="300"></img>
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Veuillez vous connecter</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Addresse mail
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Addresse mail"
            required=""
            autoFocus=""
            name="email"
            onChange={this.handleChange}
          ></input>
          <label htmlFor="inputPassword" className="sr-only">
            Mot de passe
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Mot de passe"
            required=""
            name="password"
            onChange={this.handleChange}
          ></input>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    );
  }
}
export default Signin;
