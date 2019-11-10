import React from 'react';
import PropTypes from 'prop-types';
// import Choices from './choices';

class TestBase extends React.Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        
    }
    
    render() {
        return(<div>base</div>);    
    }
}

TestBase.propTypes = {
    url: PropTypes.string.isRequired,
};

export default TestBase;