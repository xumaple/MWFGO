import React from 'react';
import PropTypes from 'prop-types';
import Traits from '../traits/traits';

function Leader(props) {
    return(
        <div className='leaderSurvey'>
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
