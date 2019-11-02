import React from 'react';
import Constraints from './constraints';

class Organizer extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className='constraints-survey'>
                <div><Constraints url={`/api/constraints/`} /></div>
            </div>
        );
    }
}