import { Component } from "react";

import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  // this state happens when react enters the component for the first time
  componentDidMount() {
    // this when we want to make an api request as well
    this.setState({ isFetching: true });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return {
            monsters: users,
          };
        })
      );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      const monsterNameToLowerCase = monster.name.toLocaleLowerCase();
      return monsterNameToLowerCase.includes(searchField);
    });

    return (
      <div className="App">
      <h1 className="app-title">
        Monsters Rolodex
      </h1>
        <SearchBox
        className='monsters-search-box'
          onChangeHandler={onSearchChange}
          placeholder='search monster'
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
