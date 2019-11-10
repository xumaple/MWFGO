import React from 'react';
import PropTypes from 'prop-types';
// import Choices from './choices';
import Base from './testBase'

class TestA extends Base {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        
    }
    
    render() {
        return(<div>{super.render()}childA</div>);    
    }
}

TestA.propTypes = {
    url: PropTypes.string.isRequired,
};

export default TestA;