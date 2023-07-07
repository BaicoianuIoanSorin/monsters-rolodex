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
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   // this state happens when react enters the component for the first time
//   componentDidMount() {
//     // this when we want to make an api request as well
//     this.setState({ isFetching: true });
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return {
//             monsters: users,
//           };
//         })
//       );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       const monsterNameToLowerCase = monster.name.toLocaleLowerCase();
//       return monsterNameToLowerCase.includes(searchField);
//     });

//     return (
//       <div className="App">
//       <h1 className="app-title">
//         Monsters Rolodex
//       </h1>
//         <SearchBox
//         className='monsters-search-box'
//           onChangeHandler={onSearchChange}
//           placeholder='search monster'
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
