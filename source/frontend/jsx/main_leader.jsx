import React from 'react';
import ReactDOM from 'react-dom';
import Leader from './leader';


// This method is only called once
ReactDOM.render(
  // Insert the likes component into the DOM

  <Leader url="/api/leader/" />,
  document.getElementById('reactEntry'),

);
