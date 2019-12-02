import React from 'react';
import Traits from '../traits/traits';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import SubmitModal from '../utility/submitModal'

// import Limiters from '../limiters/limiters';

class Organizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            showModal: false
        };
        this.getGroups = this.getGroups.bind(this);
    }

    getGroups() {        
        console.log('submitting', this.props.url);
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                if (!response.redirected) {
                    throw Error("Did not redirect on submission");
                }
                console.log(response);
                window.location.href = response.url;
            })
            .catch(error => console.log(error));
    }

    render(){
        return(
            <div>
                <div className='title'>
                    <div>Traits</div>
                    <hr/>
                </div>
                <div><Traits url={this.props.url.concat('traits/')} role='organizer' /></div>
                {/*<p><b>Limiters</b></p>
                <div><Limiters url={`${this.props.url}limiters/`} /></div>*/}
                <div className='submit-button'>
                    <Button color='primary' onClick={() => { this.setState({ showModal: true })}}>
                        Open up forms!
                    </Button>
                </div>
                <SubmitModal
                    show={this.state.showModal}
                    cancel={() => { this.setState({ showModal: false })}}
                    submit={this.getGroups}
                    link={'localhost:8000/organizer/'}
                />
            </div>
        );
    }
}

Organizer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Organizer;