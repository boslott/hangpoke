import React from 'react';
import '../../Sass/index.css';

const LetterBox = (props) => (
  <div className='letter-box'>
    <h2>{props.letter}</h2>
  </div>
);

export default LetterBox;