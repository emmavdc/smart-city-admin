import React from "react";
import { addUser, getUser, updateUser } from "../../API";
import { Link, } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.match.params.id) {
      const result = getUser(this.props.match.params.id);

      result
        .then((user) => {
          this.setState({ userToUpdate: user });
        })
        .catch((e) => {
          this.setState({ feedbackClass: "alert alert-danger" });
          if (e.response) {
            switch (e.response.status) {
              case 401:
                this.setState({ feedbackMessage: "Vous n'avez pas accès" });
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
    }


    this.state = {
      isUpdateMode: this.props.match.params.id,
      feedbackClass: "hidden",
      feedbackMessage: "",
      notReadyToSend: true,
      userToUpdate: null,
    };
  }

  initialValues() {
    const userToUpdate = this.state.userToUpdate;

    if (userToUpdate) {
      return {
        disabledSubmit: true,
        email: userToUpdate.email,
        password: "",
        firstname: userToUpdate.firstname,
        lastname: userToUpdate.lastname,
        phone: userToUpdate.phone,
        isAdmin: userToUpdate.is_admin,
        locality: userToUpdate.locality,
        postalCode: userToUpdate.postal_code,
        streetNumber: userToUpdate.street_number,
        streetName: userToUpdate.street_name,
        country: userToUpdate.country,
        isWalker: userToUpdate.is_animal_walker,
        isHost: userToUpdate.is_host,
        searchWalker: userToUpdate.search_walker,
        searchHost: userToUpdate.search_host,
      };
    } else
      return {
        disabledSubmit: true,
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
        isAdmin: false,
        locality: "",
        postalCode: "",
        streetNumber: "",
        streetName: "",
        country: "",
        isWalker: false,
        isHost: false,
        searchWalker: false,
        searchHost: false,
      };
  }

  validate(values) {
    values.disabledSubmit = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let errors = {};

    if (!values.email) {
      errors.email = "Email est manquant";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Le format de l'email n'est pas bon";
    }

    if (!values.password) {
      errors.password = "Le mot de passe est manquant";
    } else if (values.password.length < 3) {
      errors.password = "Le mot de passe doit avoir au moins 3 caractères";
    }

    if (!values.lastname) {
      errors.lastname = "Le nom est manquant";
    }

    if (!values.firstname) {
      errors.firstname = "Le prénom est manquant";
    }

    if (!values.phone) {
      errors.phone = "Le téléphone est manquant";
    }

    if (!values.locality) {
      errors.locality = "La localité est manquante";
    }

    if (!values.postalCode) {
      errors.postalCode = "Le code postal est manquant";
    }

    if (!values.streetName) {
      errors.streetName = "La rue est manquante";
    }

    if (!values.streetNumber) {
      errors.streetNumber = "Le numéro est manquant";
    }

    if (!values.country) {
      errors.country = "Le pays est manquant";
    }

    return errors;
  }

  handleSubmit(values) {
    const userModel = {
      userId: this.props.match.params.id,
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
      phone: values.phone,
      isAdmin: values.isAdmin,
      locality: values.locality,
      postalCode: values.postalCode,
      streetNumber: values.streetNumber,
      streetName: values.streetName,
      country: values.country,
      customer: { searchWalker: values.searchWalker, searchHost: values.searchHost },
      supplier: { isHost: values.isHost, isAnimalWalker: values.isWalker }
    };

    if (this.state.isUpdateMode) {

      const result = updateUser(userModel);
      result
      .then(() => {
        this.setState({
          feedbackMessage: "L'utilisateur est modifié",
          feedbackClass: "alert alert-success",
        });
      })
      .catch((e) => {
        this.setState({ feedbackClass: "alert alert-danger" });
        if (e.response) {
          switch (e.response.status) {
            case 400:
              this.setState({
                feedbackMessage:
                  "Il y a un problème dans le contenu de la requête envoyée",
              });
              break;
            case 401:
              this.setState({ feedbackMessage: "Vous n'avez pas accès" });
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

    }
    else {
    
    const result = addUser(userModel);
    result
      .then(() => {
        this.setState({
          feedbackMessage: "L'utilisateur est créé",
          feedbackClass: "alert alert-success",
        });
      })
      .catch((e) => {
        this.setState({ feedbackClass: "alert alert-danger" });
        if (e.response) {
          switch (e.response.status) {
            case 400:
              this.setState({
                feedbackMessage:
                  "Il y a un problème dans le contenu de la requête envoyée",
              });
              break;
            case 401:
              this.setState({ feedbackMessage: "Vous n'avez pas accès" });
              break;
            case 409:
              this.setState({ feedbackMessage: "l'utilisateur existe déjà (email)" });
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
    }
  }

  render() {
    return (
      <div>
        <br></br>
        <h1>{this.state.isUpdateMode? "Modifier " : "Ajouter " } un utilisateur</h1>
        <br></br>
        <div className={this.state.feedbackClass}>
          {this.state.feedbackMessage}
        </div>
        <br></br>
        <Formik
          enableReinitialize
          initialValues={this.initialValues()}
          validate={this.validate.bind(this)}
          onSubmit={async (values) => {
            this.handleSubmit(values);
          }}
        >
          {(props) => (
            /* Our <Form> component is our main container */
            <Form>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <Field
                      type="text"
                      name="lastname"
                      placeholder="Nom"
                      className={`form-control ${
                        props.errors.lastname ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="lastname"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col">
                    <Field
                      type="text"
                      name="firstname"
                      placeholder="Prénom"
                      className={`form-control ${
                        props.errors.firstname ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="firstname"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={`form-control ${
                        props.errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      className={`form-control ${
                        props.errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Field
                      type="tel"
                      name="phone"
                      placeholder="Téléphone"
                      className={`form-control ${
                        props.errors.phone ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="phone"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col"></div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <Field
                      type="tel"
                      name="locality"
                      placeholder="Localité"
                      className={`form-control ${
                        props.errors.locality ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="locality"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col">
                    <Field
                      type="text"
                      name="postalCode"
                      placeholder="Code postal"
                      className={`form-control ${
                        props.errors.postalCode ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="postalCode"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Field
                      type="text"
                      name="streetName"
                      placeholder="Rue"
                      className={`form-control ${
                        props.errors.streetName ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="streetName"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col">
                    <Field
                      type="text"
                      name="streetNumber"
                      placeholder="Numéro"
                      className={`form-control ${
                        props.errors.streetNumber ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="streetNumber"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Field
                      component="select"
                      name="country"
                      className={`form-select-input ${
                        props.errors.country ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">...</option>
                      <option>Belgique</option>
                      <option>France</option>
                      <option>Luxembourg</option>
                      <option>Pays Bas</option>
                    </Field>
                    <ErrorMessage
                      component="div"
                      name="country"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col"></div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="isWalker"
                        className={`form-check-input ${
                          props.errors.isWalker ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="isWalker"
                        className="invalid-feedback"
                      />
                      <label className="form-check-label" htmlFor="isWalker">
                        Je promène
                      </label>
                    </div>
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="isHost"
                        className={`form-check-input ${
                          props.errors.isHost ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="isHost"
                        className="invalid-feedback"
                      />
                      <label className="form-check-label" htmlFor="isHost">
                        Je garde
                      </label>
                    </div>
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="searchWalker"
                        className={`form-check-input ${
                          props.errors.searchWalk ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="searchWalker"
                        className="invalid-feedback"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="searchWalker"
                      >
                        Je cherche un promeneur
                      </label>
                    </div>
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="searchHost"
                        className={`form-check-input ${
                          props.errors.searchHost ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="searchHost"
                        className="invalid-feedback"
                      />
                      <label className="form-check-label" htmlFor="searchHost">
                        Je cherche un hôte
                      </label>
                    </div>
                    <br></br>
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="isAdmin"
                        className={`form-check-input ${
                          props.errors.isAdmin ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="isAdmin"
                        className="invalid-feedback"
                      />
                      <label className="form-check-label" htmlFor="isAdmin">
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
                value={this.state.isUpdateMode? "Modifier " : "Ajouter " }
                disabled={
                  props.values.disabledSubmit ||
                  props.isSubmitting ||
                  Object.keys(props.errors).length > 0
                }
              ></input>
              &nbsp;
              <Link to="/main/users" className="btn btn-primary">
                Annuler
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default UserForm;
