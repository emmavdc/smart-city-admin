import React from "react";
import { addUser } from "../../API";
import { Redirect } from "react-router-dom";

class AddUser extends React.Component {
  constructor() {
    super();
    this.state = {
      feedbackClass: "hidden",
      redirectToUsers: false,
      feedbackMessage: "",
      notReadyToSend: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);



  }

  handleChange(event) {
    let nam = event.target.name;
    let val;
    let feedbackMessage;
    let feedbackClass;
    let notReadyToSend;


    if (event.target.type === "checkbox") {
      val = event.target.checked;
    } else {
      val = event.target.value;
    }

    this.setState({ [nam]: val}, (feedbackMessage, feedbackClass, notReadyToSend) => {
    if (this.isFormValid()) {
      feedbackMessage = "Le formulaire est prêt à envoyer";
      feedbackClass = "alert alert-info";
      notReadyToSend = false;
    } else {
      feedbackMessage = "Entrez tous les champs";
      feedbackClass = "alert alert-info";
      notReadyToSend = true;
    }});


    this.setState({ feedbackMessage: feedbackMessage, feedbackClass: feedbackClass, notReadyToSend: notReadyToSend });
  }

  isFormValid()  {
    const {email, password, firstname, lastname, phone, locality, postalCode, streetNumber, streetName, country} = this.state;

    return email && email !== "" &&
           password && password !== "" &&
           firstname && firstname !== "" &&
           lastname && lastname !== "" &&
           phone && phone !== "" && 
           locality && locality !== "" &&
           postalCode && postalCode !== "" &&
           streetNumber && streetNumber !== "" && 
           streetName && streetName !== "" && 
           country && country !== "" ? true : false;
  };

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
        this.setState({
          feedbackMessage: "Le user est créé",
          feedbackClass: "alert alert-success",
        });
      })
      .catch((e) => {
        this.setState({ feedbackClass: "alert alert-danger" });
        if (e.response) {
          switch (e.response.status) {
            case 401:
              this.setState({ feedbackMessage: "Vous n'avez pas accès" });
              break;
            case 409:
              this.setState({ feedbackMessage: "User existe déjà (email)" });
              break;
            default:
              this.setState({ feedbackMessage: e.response.statusText });
              break;
          }
        } else {
          this.setState({
            feedbackMessage: "L'application est temporairement hors service",
          });
        }
      });

    event.preventDefault();
  }

  handleCancel(event) {
    this.setState({
      redirectToUsers: true,
      errorMessage: "",
      errorClass: "hidden",
    });
  }

  render() {
    const { redirectToUsers } = this.state;

    if (redirectToUsers) {
      return <Redirect to="/main/users" />;
    }
    return (
      <div className="container">
        <br></br>
        <h1>Ajouter un utilisateur</h1>
        <br></br>
        <div className={this.state.feedbackClass}>
          {this.state.feedbackMessage}
        </div>
        <br></br>
        <form onSubmit={this.handleSubmit} autoComplete="off">
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
                    name="isAdmin"
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
            disabled={this.state.notReadyToSend}
          ></input>
          &nbsp;
          <input
            type="button"
            className="btn btn-primary"
            value="Annuler"
            onClick={this.handleCancel}
          ></input>
        </form>
      </div>
    );
  }
}
export default AddUser;
