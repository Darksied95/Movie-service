import React, { Component } from "react";

class Search extends Component {
  state = {
    value: "",
  };

  doSearch = ({ currentTarget }) => {
    let value = currentTarget.value.toLowerCase();
    console.log(value);
    this.props.onSearch(value);
    this.setState({ value });
  };
  render() {
    return (
      <div className="input-group">
        <div className="form-outline">
          <input
            type="search"
            id="form1 search-focus"
            className="form-control"
            placeholder="Search..."
            value={this.state.value}
            onChange={this.doSearch}
          />
        </div>
      </div>
    );
  }
}

export default Search;
