import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Traits from '../../traits/traits';

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                console.log(this.props.url)
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                // TODO
            })
            .catch(error => console.log(error));
    }

    openForms() {
        console.log('submitting', this.props.url);
        fetch(this.props.url.concat('submit/'), { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .catch(error => console.log(error));
    }

    render(){
        return(
            <div>
                
            </div>
        );
    }
}

Results.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Results;