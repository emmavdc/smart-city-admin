import React from "react";
import { addUser } from "../../API";

class AddUser extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  handleSubmit(event) {
    const userModel = {
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      isAdmin: this.state.isAdmin,
      locality: this.state.locality,
      postalCode: this.state.postalCode,
      streetNumber: this.state.streetNumber,
      streetName: this.state.streetName,
      country: this.state.country,
    };

    const result = addUser(userModel);

    result
      .then((data) => {
        this.setState({ redirectAfterPost: true, errorMessage: "" });
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          this.setState({ errorMessage: "Vous n'avez pas accès" });
        } else {
          this.setState({
            errorMessage: "L'application est temporairement hors service",
          });
        }
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <br></br>
        <h1>Ajouter un utilisateur</h1>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  name="lastname"
                  id="name"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Prénom"
                  name="firstname"
                  id="firstname"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Adresse email"
                  name="email"
                  id="email"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Téléphone"
                  name="phone"
                  id="phone"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="col"></div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Localité"
                  name="locality"
                  id="locality"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Code postal"
                  name="postalCode"
                  id="postalcode"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rue"
                  name="streetName"
                  id="street"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Numéro"
                  name="streetNumber"
                  id="number"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pays"
                  name="country"
                  id="country"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="col"></div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="walkCheckBox"
                    id="walkCheckBox"
                    onChange={this.handleChange}
                  ></input>
                  <label className="form-check-label" htmlFor="walkCheckBox">
                    Je promène
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="keepCheckBox"
                    id="keepCheckBox"
                    onChange={this.handleChange}
                  ></input>
                  <label className="form-check-label" htmlFor="keepCheckBox">
                    Je garde
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="searchWalkerCheckBox"
                    id="searchWalkerCheckBox"
                    onChange={this.handleChange}
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor="searchWalkerCheckBox"
                  >
                    Je cherche un promeneur
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="searchHostCheckBox"
                    name="searchHostCheckBox"
                    onChange={this.handleChange}
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor="searchHostCheckBox"
                  >
                    Je cherche un hôte
                  </label>
                </div>
                <br></br>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isAdminCheckBox"
                    name="isAdminCheckBox"
                    onChange={this.handleChange}
                  ></input>
                  <label className="form-check-label" htmlFor="isAdminCheckBox">
                    Administateur
                  </label>
                </div>
              </div>
              <div className="col"></div>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Ajouter"
          ></input>
          &nbsp;
          <input
            type="button"
            className="btn btn-primary"
            value="Annuler"
          ></input>
        </form>
      </div>
    );
  }
}
export default AddUser;
