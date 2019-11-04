import React from 'react';
import ReactDOM from 'react-dom';
import Member from './member';


// This method is only called once
ReactDOM.render(
  // Insert the likes component into the DOM

  <Member url="/api/v1/member/" />,
  document.getElementById('reactEntry'),

);
