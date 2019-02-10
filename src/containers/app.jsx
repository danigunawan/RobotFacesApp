import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/cardlist";
import Title from "../components/title";
import SearchBox from "../components/searchBox";
import Scroll from "../components/scroll";
import ErrorBountry from "../components/errorBoundry";
import { setSearchField, requestRobots } from "../actions";


const mapStateToProps = state =>{
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots, 
    isPending: state.requestRobots.isPending, 
    error: state.requestRobots.error  
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    handleRequestRobot: () => dispatch(requestRobots())
  } 
};

class App extends Component {
  componentDidMount() { 
    this.props.handleRequestRobot();
  }

  render() {
    const {searchField, handleSearchChange, robots, isPending} = this.props;
    const filteredRobot = robots.filter(r =>
      r.name.toLowerCase().includes(searchField.toLowerCase())
    );

    if (isPending) {
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
