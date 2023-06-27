import { Component } from 'react';

import './App.css';

class App extends Component{
  constructor() {
    super();

    this.state = {
      monsters: [],
    }
  }

  // this state happens when react enters the component for the first time
  componentDidMount() {
    // this when we want to make an api request as well
    this.setState({isFetching: true});
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(() => {
        return {
          monsters: users
        }
      },
      () => console.log(this.state.monsters)))
  }
  
  render() {
    return (
      <div className="App">
      <div>
      {
        this.state.monsters.map((monster) => {
          return <div key={monster.id}><h1>{monster.name}</h1></div>;
        })
      }
      </div>
      </div>
    ); 
  }
}

export default App;
