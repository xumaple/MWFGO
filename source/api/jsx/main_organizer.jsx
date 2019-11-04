import React from 'react';
import ReactDOM from 'react-dom';
import Organizer from './organizer';


// This method is only called once
ReactDOM.render(
  // Insert the likes component into the DOM

  <Organizer url="/api/v1/organizer/" />,
  document.getElementById('reactEntry'),

);
