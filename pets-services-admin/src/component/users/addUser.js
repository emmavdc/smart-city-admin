import React from "react";
class AddUser extends React.Component {
  constructor() {
    super();
    const users = [];
    this.state = { users: users };
  }


  render() {
    return (
      <div className="container text-center">
        <br></br>
        <h1>Ajouter un utilisateur</h1>
        <br></br>
      </div>
    );
  }
}
export default AddUser;
