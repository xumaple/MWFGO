import React from 'react';
import ReactDOM from 'react-dom';
import Leader from './leader';


// This method is only called once
ReactDOM.render(
  // Insert the likes component into the DOM

  <Leader url="/restAPI/leader/" />,
  document.getElementById('reactEntry'),

);
