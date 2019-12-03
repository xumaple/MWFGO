import React from 'react';
import ReactDOM from 'react-dom';
import Index from '../person/organizer/index';

const organizer = '/organizer/'.concat(
    document.getElementById('username').textContent, '/')
ReactDOM.render(

    <Index 
        url={'/api/v1'.concat(organizer)}
        source={organizer}
    />,
    document.getElementById('reactEntry'),

);
