import React from 'react';
import ReactDOM from 'react-dom';
import Member from './member';


// This method is only called once
ReactDOM.render(
  // Insert the likes component into the DOM

  <Member url="/restAPI/member/" />,
  document.getElementById('reactEntry'),

);
