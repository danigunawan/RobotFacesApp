import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/cardlist";
import Title from "../components/title";
import SearchBox from "../components/searchBox";
import Scroll from "../components/scroll";
import ErrorBountry from "../components/errorBoundry";
import { setSearchField } from "../actions";


const mapStateToProps = state =>{
  return {
    // searchField: state.searchRobots.searchField
    searchField: state.searchField
  }
};

const mapDispatchToProps = (dispatch) => {
  return {handleSearchChange: (event) => dispatch(setSearchField(event.target.value))} 
};

class App extends Component {
  state = {
    robots: []
    // searchfield: ""
  };

  componentDidMount() { 
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  // handleSearchChange = event => {
  //   this.setState({ searchfield: event.target.value });
  // };

  render() {
    const { robots} = this.state;
    const {searchField, handleSearchChange} = this.props;
    const filteredRobot = robots.filter(r =>
      r.name.toLowerCase().includes(searchField.toLowerCase())
    );

    if (!robots.length) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="tc">
        <Title />
        <SearchBox onSearchChange={handleSearchChange} />
        <Scroll>
          <ErrorBountry>
            <CardList robots={filteredRobot} />
          </ErrorBountry>
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
