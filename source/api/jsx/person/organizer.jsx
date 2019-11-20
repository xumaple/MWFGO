import React from 'react';
import Traits from '../traits/traits';
import PropTypes from 'prop-types';
// import Limiters from '../limiters/limiters';

class Organizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}, 
        };
        this.getGroups = this.getGroups.bind(this);
    }

    getGroups() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    data: data,
                });
            })
            .catch(error => console.log(error));
    }

    render(){
        return(
            <div>
                <p><b>Traits</b></p>
                <div><Traits url={`${this.props.url}traits/`} role='organizer' /></div>
                {/*<p><b>Limiters</b></p>
                <div><Limiters url={`${this.props.url}limiters/`} /></div>*/}
                <Button onClick={this.getGroups}>
                    Generate Groups!
                </Button>
            </div>
        );
    }
}

Organizer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Organizer;