import React, { Component } from "react";
import CardList from "../components/cardlist";
import Title from "../components/title";
import SearchBox from "../components/searchBox";
import Scroll from "../components/scroll";
import ErrorBountry from "../components/errorBoundry";

class App extends Component {
  state = {
    robots: [],
    searchfield: ""
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  handleSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobot = robots.filter(r =>
      r.name.toLowerCase().includes(searchfield.toLowerCase())
    );

    if (!robots.length) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="tc">
        <Title />
        <SearchBox onSearchChange={this.handleSearchChange} />
        <Scroll>
          <ErrorBountry>
            <CardList robots={filteredRobot} />
          </ErrorBountry>
        </Scroll>
      </div>
    );
  }
}

export default App;
