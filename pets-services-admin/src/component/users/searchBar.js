import React from "react";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      searchEmail: "",
      searchLocality: "",
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
      searchName: this.state.searchName,
      searchEmail: this.state.searchEmail,
      searchLocality: this.state.searchLocality,
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="searchName"
          onChange={this.handleChange}
        ></input>
        <input
          type="email"
          name="searchEmail"
          onChange={this.handleChange}
        ></input>
        <input
          type="text"
          name="searchLocality"
          onChange={this.handleChange}
        ></input>
        <input type="button" onClick={this.handleSearch} value="Chercher">
        </input>
      </div>
    );
  }
}
export default SearchBar;
