import React from "react";
import {searchServicesHours} from "../../API";
import OptionsBar from "./optionsBar"; 
import  "react-bootstrap";
class Services extends React.Component {

  constructor() {
    super();
    const services = [];
    this.state = {
      services: services
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



  render() {

    return (
      <div className="container">
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
                  <tr key={service.service_hour_id}>
                    <td>{service.supplier_lastname}</td>
                    <td>{service.supplier_firstname}</td>
                    <td>{service.customer_lastname}</td>
                    <td>{service.customer_firstname}</td>
                    <td>{service.start_date_time}</td>
                    <td>{service.end_date_time}</td>
                    <td>{service.type}</td>
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