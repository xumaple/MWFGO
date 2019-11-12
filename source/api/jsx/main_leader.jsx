import React from 'react';
import ReactDOM from 'react-dom';
import Member from './person/leader';


// This method is only called once
ReactDOM.render(
  // Insert the likes component into the DOM

  <Member url="/api/v1/leader/" />,
  document.getElementById('reactEntry'),

);
