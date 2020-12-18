import React from "react";
import {searchRankings, deleteRanking} from "../../API";
import OptionsBar from "./optionsBar"; 
import { Modal, Button } from "react-bootstrap";
class Evaluations extends React.Component {

  constructor() {
    super();
    const rankings = [];
    this.state = {
      rankings: rankings,
      rankingToDelete : null,
      showPopupConfirmDelete: false
    };
  }

  searchRankings(filters){
    const result = searchRankings(filters);

    result
    .then((data) => {
      const dataArray = [...data];
      this.setState({ rankings: dataArray });
    })
    .catch((e) => {
      this.setState({
        feedbackMessage: "Erreur de récupération des évaluations",
      });
    });
  }

  removeRanking(ranking){
    const result = deleteRanking(ranking.ranking_id);

    result
      .then(() => {
        const rankingToRefresh = this.state.rankings;
        const afterFiltering = rankingToRefresh.filter(
          (r) => r.ranking_id !== ranking.ranking_id
        );
        this.setState({ rankings: afterFiltering });
      })
      .catch((e) => {
        this.setState({
          feedbackMessage: "Erreur lors de la suppression",
        });
      });

  }

  handleAskDeleteConfirmPopup (ranking) {
    this.setState({ showPopupConfirmDelete: true, rankingToDelete: ranking });
  }

  handleCloseDeleteConfirmPopup () {
    this.setState({ showPopupConfirmDelete: false, rankingToDelete: null });
  }

  handleDeleteConfirmPopup () {
      this.removeRanking(this.state.rankingToDelete);
      this.setState({ showPopupConfirmDelete: false, rankingToDelete: null });
    }

  render() {

    return (
      <div className="container">
        <Modal show={this.state.showPopupConfirmDelete} 
               onHide={()=>this.handleCloseDeleteConfirmPopup()}
               backdrop="static"
               animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Supprimer l'évaluation</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{`Êtes vous certains de vouloir supprimer l'évaluation ?`}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={()=>this.handleCloseDeleteConfirmPopup()}>Non</Button>
            <Button variant="primary" onClick={()=>this.handleDeleteConfirmPopup()}>Oui</Button>
          </Modal.Footer>
        </Modal>
        <br></br>
        <h1>Liste des évaluations</h1>
        <br></br>
        <OptionsBar
          className=""
          callback={(filters) => this.searchRankings(filters)}
        />
        <br></br>
        {this.state.rankings.length > 0 &&(
          <table className="container table table-striped">
            <thead>
              <tr>
                <th>Nom Auteur</th>
                <th>Prénom Auteur</th>
                <th>Nom Offreur</th>
                <th>Prénom Offreur</th>
                <th>Nombre d'étoiles sur 5</th>
                <th>Commentaire</th>
                <th>Date de début</th>
                <th>Date de fin</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rankings.map((ranking)=>{
                return(
                  <tr key={ranking.ranking_id}>
                    <td>{ranking.customer_lastname}</td>
                    <td>{ranking.customer_firstname}</td>
                    <td>{ranking.supplier_lastname}</td>
                    <td>{ranking.supplier_firstname}</td>
                    <td>{ranking.number_of_stars}</td>
                    <td>{ranking.review}</td>
                    <td>{ranking.start_date_time}</td>
                    <td>{ranking.end_date_time}</td>
                    <td className="text-center">
                      <button
                        className="btn"
                        onClick={() => this.handleAskDeleteConfirmPopup(ranking)}
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
export default Evaluations;