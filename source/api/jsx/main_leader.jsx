import React from 'react';
import ReactDOM from 'react-dom';
import Leader from './leader';


// This method is only called once
ReactDOM.render(
  // Insert the likes component into the DOM

  <Leader url="/api/v1/leader/" />,
  document.getElementById('reactEntry'),

);
