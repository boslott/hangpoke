import React, { Component } from 'react';
import logo from './images/pokeball.png';
import './App.css';

// Components
import Title from './Components/Title/Title';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Title />
        </header>
      </div>
    );
  }
}

export default App;
