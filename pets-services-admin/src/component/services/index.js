import React from "react";
import {searchServicesHours, deleteServiceHours} from "../../API";
import OptionsBar from "./optionsBar"; 
import { Modal, Button } from "react-bootstrap";
class Services extends React.Component {

  constructor() {
    super();
    const services = [];
    this.state = {
      services: services,
      serviceToDelete : null,
      showPopupConfirmDelete: false
    };
  }


  searchServicesHours(filters){
    const result = searchServicesHours(filters);

    result
    .then((data) => {
      const dataArray = [...data];
      this.setState({ services: dataArray });
    })
    .catch((e) => {
      this.setState({
        feedbackMessage: "Erreur de récupération des services",
      });
    });
  }

  removeServiceHours(serviceHour){
    const result = deleteServiceHours(serviceHour.service_hours_id);

    result
      .then(() => {
        const serviceHourToRefresh = this.state.services;
        const afterFiltering = serviceHourToRefresh.filter(
          (s) => s.service_hours_id !== serviceHour.service_hours_id
        );
        this.setState({ services: afterFiltering });
      })
      .catch((e) => {
        this.setState({
          feedbackMessage: "Erreur lors de la suppression",
        });
      });

  }

  handleAskDeleteConfirmPopup (serviceHour) {
    this.setState({ showPopupConfirmDelete: true, serviceToDelete: serviceHour });
  }

  handleCloseDeleteConfirmPopup () {
    this.setState({ showPopupConfirmDelete: false, serviceToDelete: null });
  }

  handleDeleteConfirmPopup () {
      this.removeServiceHours(this.state.serviceToDelete);
      this.setState({ showPopupConfirmDelete: false, serviceToDelete: null });
    }


  render() {

    return (
      <div className="container">
        <Modal show={this.state.showPopupConfirmDelete} 
               onHide={()=>this.handleCloseDeleteConfirmPopup()}
               backdrop="static"
               animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Supprimer le service</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{`Êtes vous certains de vouloir supprimer le service ?`}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={()=>this.handleCloseDeleteConfirmPopup()}>Non</Button>
            <Button variant="primary" onClick={()=>this.handleDeleteConfirmPopup()}>Oui</Button>
          </Modal.Footer>
        </Modal>
        <br></br>
        <h1>Liste des services</h1>
        <br></br>
        <OptionsBar
          className=""
          callback={(filters) => this.searchServicesHours(filters)}
        />
        <br></br>
        {this.state.services.length > 0 &&(
          <table className="container table table-striped">
            <thead>
              <tr>
                <th>Nom Offreur</th>
                <th>Prénom Offreur</th>
                <th>Nom Demandeur</th>
                <th>Prénom Demandeur</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {this.state.services.map((service)=>{
                return(
                  <tr key={service.service_hours_id}>
                    <td>{service.supplier_lastname}</td>
                    <td>{service.supplier_firstname}</td>
                    <td>{service.customer_lastname}</td>
                    <td>{service.customer_firstname}</td>
                    <td>{service.start_date_time}</td>
                    <td>{service.end_date_time}</td>
                    <td>{service.type}</td>
                    <td className="text-center">
                      <button
                        className="btn"
                        onClick={() => this.handleAskDeleteConfirmPopup(service)}
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-trash"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }

}
export default Services;