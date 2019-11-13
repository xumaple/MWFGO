import React from 'react';
import Traits from '../traits/traits';
import PropTypes from 'prop-types';
// import Limiters from '../limiters/limiters';

class Organizer extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className='survey'>
                <p><b>Traits</b></p>
                <div><Traits url={`${this.props.url}traits/`} role='organizer' /></div>
                {/*<p><b>Limiters</b></p>
                <div><Limiters url={`${this.props.url}limiters/`} /></div>*/}
            </div>            
        );
    }
}

Organizer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Organizer;