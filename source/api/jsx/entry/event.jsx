import React from 'react';
import ReactDOM from 'react-dom';
import Event from '../person/organizer/event';

const organizer = '/organizer/'.concat(
    document.getElementById('username').textContent,
    '/events/',
    document.getElementById('event_id').textContent, 
    '/'
)
ReactDOM.render(
    <Event 
        url={'/api/v1'.concat(organizer)}
        source={organizer}
    />,
    
    document.getElementById('reactEntry'),

);
