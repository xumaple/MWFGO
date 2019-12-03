import React from 'react';
import ReactDOM from 'react-dom';
import Member from '../person/leader';


ReactDOM.render(

    <Member url="/api/v1/leader/" />,
    document.getElementById('reactEntry'),

);
