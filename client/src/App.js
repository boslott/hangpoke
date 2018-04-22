import React, { Component } from 'react';
import { Container, Row } from 'react-grid-system';
import { RingLoader } from 'react-spinners';
import axios from 'axios';
import logo from './images/pokeball.png';
import './Sass/index.css';

// Components
import GameImage from './Components/GameImage/GameImage';
import Word from './Components/Word/Word';

class App extends Component {

  state = {
    loading: true,
    currentPokemon: {},
    currentImageState: 'hidden',
  }

  UNSAFE_componentWillMount() {
    this.getNewPokemon();
  }

  savePokemon = (pokemon) => {
    localStorage.setItem('currentPokemon', JSON.stringify(pokemon));
  }

  getNewPokemon = () => {
    if(!localStorage.getItem('currentPokemon')) {
      let random = Math.floor(Math.random()* 800);
      if(random === 0 ) random++;
      axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`)
      .then(pokemon => {
        this.savePokemon(pokemon.data);
        this.setState({ currentPokemon: pokemon.data, loading: false })
      })
      .catch(err => console.log(err));
    } else {
      this.setState({ currentPokemon: JSON.parse(localStorage.getItem('currentPokemon')), loading: false });
    }
  }

  inGameNewPokemon = () => {
    localStorage.removeItem('currentPokemon');
    this.setState({ loading: true });
    this.getNewPokemon();
  }

  loader = () => {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Container>
          <Row className='row-center'>
            <RingLoader
              color='blue'
              loading={this.state.loading}
            />
          </Row>
        </Container>
      </div>
    );
  }

  gamePage = () => {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Container fluid>
          <Row className='row-center'>
            <GameImage
              src={this.state.currentPokemon.sprites.front_default}
              currentState={this.state.currentImageState}
            />
          </Row>
          <Word currentWord={this.state.currentPokemon.name} />
          <button onClick={this.inGameNewPokemon}>Get New Pokemon</button>
        </Container>
      </div>
    );
  }

  render() {
    const display = this.state.loading ? this.loader() : this.gamePage();
    return (
      <div>
        {display}
      </div>
    );
  }
}

export default App;
