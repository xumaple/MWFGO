import React from 'react';
import ReactDOM from 'react-dom';
import Traits from '../../traits/traits';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import SubmitModal from '../../utility/submitModal'
import EventName from './eventName'


// import Limiters from '../limiters/limiters';

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showModal: false };
        this.openForms = this.openForms.bind(this);
    }

    componentDidMount() {}

    openForms() {
        console.log('submitting', this.props.url);
        fetch(this.props.url.concat('submit/'), { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                if (!response.redirected) {
                    throw Error("Did not redirect on submission");
                }
                window.location.href = response.url;
            })
            .catch(error => console.log(error));
    }

    render(){
        return(
            <div>
                <div className='title'>
                    <EventName url={this.props.url} showEditButton={true} />
                </div>
                <hr/>
                <h4 style={{textAlign: 'center'}}>Traits</h4>
                <div><Traits url={this.props.url.concat('traits/')} role='organizer' /></div>
                <h4 style={{textAlign: 'center'}}>Limiters</h4>
                {/*<p><b>Limiters</b></p>
                <div><Limiters url={`${this.props.url}limiters/`} /></div>*/}
                <div className='submit-button'>
                    <Button color='primary' onClick={() => { this.setState({ showModal: true })}}>
                        Open up forms!
                    </Button>
                </div>
                <Button onClick={() => {window.location.href = this.props.source.substring(0, this.props.source.search('/events/'))}} >
                    Back
                </Button>
                <SubmitModal
                    show={this.state.showModal}
                    cancel={() => { this.setState({ showModal: false })}}
                    submit={this.openForms}
                    link={'localhost:8000'.concat(this.props.source)}
                />
            </div>
        );
    }
}

Event.propTypes = {
    url: PropTypes.string.isRequired,
    source: PropTypes.string,
};

export default Event;

const organizer = '/organizer/'.concat(
    document.getElementById('username').textContent,
    '/events/',
    document.getElementById('event_id').textContent, 
    '/configure/',)

ReactDOM.render(
    <Event 
        url={'/api/v1'.concat(organizer)}
        source={organizer}
    />, document.getElementById('reactEntry')
);
