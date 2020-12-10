/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { addUser } from "../../API";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

class AddUserForm extends React.Component {

    constructor() {
        super();
        this.state = {
            feedbackClass: "hidden",
            redirectToUsers: false,
            feedbackMessage: "",
            notReadyToSend: true,
        };

        this.handleCancel = this.handleCancel.bind(this);
    
      }


    initialValues() {
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
          country: ""
        }
      }


      validate(values) {
        values.disabledSubmit = false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let errors = {};
    
        if (values.email === "") {
          errors.email = "Email est manquant";
        } else if (!emailRegex.test(values.email)) {
          errors.email = "Le format de l'email n'est pas bon";
        }
        if (values.password === "") {
          errors.password = "Le mot de passe est manquant";
        } else if (values.password.length < 3) {
          errors.password = "Le mot de passe doit avoir au moins 3 caractères";
        }
        if (values.lastname === "") {
            errors.lastname = "Le nom est manquant";
        }  
        return errors;    
      }


  handleSubmit(values) {
    const userModel = {
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
        <Formik
          initialValues={this.initialValues()}
          validate={this.validate.bind(this)}
          onSubmit={async (values) => {
              this.handleSubmit(values);
            }
          
        }
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
                          className={`form-control ${props.errors.lastname ? "is-invalid" : ""}`}
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
                          className={`form-control ${props.errors.firstname ? "is-invalid" : ""}`}
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
                          className={`form-control ${props.errors.email ? "is-invalid" : ""}`}
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
                          className={`form-control ${props.errors.password ? "is-invalid" : ""}`}
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
                          className={`form-control ${props.errors.phone ? "is-invalid" : ""}`}
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
                          className={`form-control ${props.errors.locality ? "is-invalid" : ""}`}
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
                          className={`form-control ${props.errors.postalCode ? "is-invalid" : ""}`}
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
                          className={`form-control ${props.errors.streetName ? "is-invalid" : ""}`}
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
                          className={`form-control ${props.errors.streetNumber ? "is-invalid" : ""}`}
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
                          type="text"
                          name="country"
                          placeholder="Pays"
                          className={`form-control ${props.errors.country ? "is-invalid" : ""}`}
                        />
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
                          name="walkCheckBox"
                          placeholder="Pays"
                          className={`form-check-input ${props.errors.walkCheckBox ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="walkCheckBox"
                          className="invalid-feedback"
                        />                         
                      <label
                        className="form-check-label"
                        htmlFor="walkCheckBox"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="keepCheckBox"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="isAdminCheckBox"
                      >
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
                disabled={props.values.disabledSubmit || props.isSubmitting || Object.keys(props.errors).length > 0} 
              ></input>
              &nbsp;
              <input
                type="button"
                className="btn btn-primary"
                value="Annuler"
                onClick={this.handleCancel}
              ></input>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default AddUserForm;
