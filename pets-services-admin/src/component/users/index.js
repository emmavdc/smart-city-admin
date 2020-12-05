import React from "react";
import { searchUser } from "../../API";
import SearchBar from "./searchBar";
class Users extends React.Component {
  constructor() {
    super();
    const users = [];
    this.state = { users: users };
  }

  searchUser(filters) {
    const result = searchUser(filters);

    result
      .then((data) => {
        const dataArray = [...data];
        this.setState({ users: dataArray });
      })
      .catch((e) => {
        this.setState({
          errorMessage: "Erreur de récupération des utilisateurs.",
        });
      });
  }

  render() {
    return (
      <div className="text-center">
        <br></br>
        <h1>Liste des utilisateurs</h1>
        <br></br>
        <SearchBar callback={(filters) => this.searchUser(filters)}></SearchBar>
        <br></br>
        {this.state.users.length > 0 &&
          <table className="container">
            <thead>
              <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Adresse mail</th>
                <th>Localité</th>
                <th>Offreur</th>
                <th>Demandeur</th>
                <th>Nb Animaux</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => {
                return (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.firstname +" "+ user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.locality}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
      </div>
    );
  }
}
export default Users;
