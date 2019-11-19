import React from 'react';
import PropTypes from 'prop-types';
import Traits from '../traits/traits';

function Leader(props) {
    return(
        <div>
            <p><b>Survey</b></p>
            <Traits 
                role='leader'
                url={props.url.concat('traits/')}
            />
        </div>
    );
}

Leader.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Leader;
