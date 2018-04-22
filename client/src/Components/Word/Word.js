import React, { Component } from 'react';
import { Row } from 'react-grid-system';
import '../../Sass/index.scss';

import LetterBox from '../LetterBox/LetterBox';

export default class Word extends Component {

  state = {
    currentWord: [],
    numGuesses: 0,
    wrongLetters: [],
  }

  componentDidMount() {
    const wordArray = this.props.currentWord.split('');
    this.setState({ currentWord: wordArray });
  }

  render() {
    let keyCount = -1;
    return (
      <Row className='row-center'>
        {this.state.currentWord.map(letter => {
          keyCount++;
          return <LetterBox letter={''} key={keyCount} />
        })}
      </Row>
    );
  }
}