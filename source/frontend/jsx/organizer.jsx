import React from 'react';
import Traits from './traits';

class Organizer extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className='traits-survey'>
                <div><Traits url={`${this.props.url}traits/`} /></div>
            </div>
        );
    }
}