import React from 'react';
import ReactDOM from 'react-dom';
import Member from './person/member';


// This method is only called once
ReactDOM.render(
  // Insert the likes component into the DOM

  <Member url='/api/v1/member/' hash={document.getElementById('hash').textContent} />,
  document.getElementById('reactEntry'),

);
//.concat(document.getElementById('hash').textContent, '/')