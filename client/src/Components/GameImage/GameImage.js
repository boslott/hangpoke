import React, { Component } from 'react';
import '../../Sass/index.css';



export default class GameImage extends Component {



  render() {
    return (
      <div>
        <img src={this.props.src} alt='Pokemon image' className='game-image' />
      </div>
    );
  }
}