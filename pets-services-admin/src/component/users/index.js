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
      <div>
        <SearchBar callback={(filters) => this.searchUser(filters)}></SearchBar>
        <table>
          <thead>
            <tr>
              <th>nom</th>
              <th>prenom</th>
              <th>age</th>
              <th>Voir plus d'info</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => {
              return (
                <tr key={user.user_id}>
                  <td>{user.lastname}</td>
                  <td>{user.firstname}</td>
                  <td>{user.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Users;
