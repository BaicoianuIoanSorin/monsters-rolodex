import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState(""); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);
  const [stringField, setStringField] = useState('');
  console.log("render");

  useEffect(
    () => {
      // effect fired
      // first argument is the callback - that means the code
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((users) => setMonsters(users));
    },
    // second argument is an array that contains dependencies
    // it says that whenever a value from this second argument is changed, than i will call the code above again
    // if you don't want to trigger this again, you pass an empty array
    []
  );

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    }); 
    
    setFilterMonsters(newFilteredMonsters);

    console.log('effect is firing')
  }, 
  [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();

    //if setSearchField function does not update the value searchField with a new value, the render will not be triggered
    //that means that react is smart enough to know if the rendering is necessarily or not.
    setSearchField(searchFieldString);
  };


  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodex</h1>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
