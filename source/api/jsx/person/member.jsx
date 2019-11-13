import React from 'react';
import PropTypes from 'prop-types';
import Traits from '../traits/traits';

function Member(props) {
    return(
        <div className='memberSurvey'>
            <p><b>Survey</b></p>
            <Traits 
                role='member'
                url={props.url.concat('traits/')}
            />
        </div>
    );
}

Member.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Member;
