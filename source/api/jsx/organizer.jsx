import React from 'react';
import Traits from './traits/traits';
// import Limiters from './limiters';

class Organizer extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className='survey'>
                <p><b>Traits</b></p>
                <div><Traits url={this.props.url.concat('traits/')} /></div>
                {/* <p><b>Limiters</b></p>
                <div><Limiters url={`${this.props.url}limiters/`} /></div> */}
            </div>            
        );
    }
}

export default Organizer;