import React from 'react';
import ReactDOM from 'react-dom';
import Intro from '../person/intro';

ReactDOM.render(

    <Intro url={'/api/v1/member/'.concat(document.getElementById('event_id').textContent, '/')}/>,
    document.getElementById('reactEntry'),

);
