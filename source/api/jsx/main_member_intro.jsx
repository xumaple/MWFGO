import React from 'react';
import ReactDOM from 'react-dom';
import Intro from './person/intro';

// This method is only called once
ReactDOM.render(
  // Insert the likes component into the DOM

  <Intro url="/api/v1/member/"/>,
  document.getElementById('reactEntry'),

);
