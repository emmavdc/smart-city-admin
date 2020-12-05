import React from "react";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      email: "",
      locality: "",
      callback: props.callback,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  handleSearch(event) {
    this.state.callback({
      lastname: this.state.lastname,
      email: this.state.email,
      locality: this.state.locality,
    });
  }

  render() {
    return (
      <div>
        <input
          id="inputName"
          placeholder="Nom"
          type="text"
          name="lastname"
          onChange={this.handleChange}
        ></input>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={this.handleChange}
        ></input>
        <input
          type="text"
          placeholder="Localité"
          name="locality"
          onChange={this.handleChange}
        ></input>
        <input
          type="button"
          onClick={this.handleSearch}
          value="Chercher"
        ></input>
      </div>
    );
  }
}
export default SearchBar;
