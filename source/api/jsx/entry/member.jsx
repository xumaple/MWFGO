import React from 'react';
import ReactDOM from 'react-dom';
import Member from '../person/member';


ReactDOM.render(

    <Member 
        url={'/api/v1/member/'.concat(document.getElementById('event_id').textContent, '/')}
        hash={document.getElementById('hash').textContent}
    />,
    document.getElementById('reactEntry'),

);
