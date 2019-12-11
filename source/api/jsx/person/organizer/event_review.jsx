import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import SubmitModal from '../../utility/submitModal'
import EventName from './eventName'
import Results from './results'

const URL_RESULTS = 'review/'
// import Limiters from '../limiters/limiters';

function Groups(props) {
    return (<div></div>);
}

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            link: null,
            showModal: false,
            groups: null, 
        };

        this.getGroups = this.getGroups.bind(this);
        this.generateGroups = this.generateGroups.bind(this);
    }

    componentDidMount() {
        this.getGroups();
    }

    getGroups() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
            console.log(data);
                this.setState({ link: 'localhost:8000'.concat(data.link) });
            })
            .catch(error => console.log(error));

    }

    generateGroups() {
        fetch(this.props.url.concat('submit/'), { credentials: 'same-origin' })
            .then((response) => {
                console.log(response);
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                // this.getGroups();
                this.setState({groups: data.groups, showModal: false})
            })
            .catch(error => console.log(error));
    }

    render(){
        console.log(this.state.link);
        return(
            <div>
                <div className='title'>
                    <EventName url={this.props.url} showEditButton={true} />
                </div>
                <hr/>
                Please send this link to members for responses: <a href={this.state.link}>{this.state.link}</a>
                <h3>Responses:</h3>
                <Results url={this.props.url.concat('results/')} />
                <div className='submit-button'>
                    <Button color='primary' onClick={() => { this.setState({ showModal: true })}}>
                        Generate groups!
                    </Button>
                </div>

                <div>
                    {this.state.groups === null ? '' : 
                        JSON.stringify(this.state.groups)
                    }
                </div>


                <Button onClick={() => {window.location.href = this.props.source.substring(0, this.props.source.search('/events/'))}} >
                    Back
                </Button>
                <SubmitModal
                    show={this.state.showModal}
                    cancel={() => { this.setState({ showModal: false })}}
                    submit={this.generateGroups}
                    link={'localhost:8000'.concat(this.props.source, URL_RESULTS)}
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
    '/',)

ReactDOM.render(
    <Event 
        url={'/api/v1'.concat(organizer, URL_RESULTS)}
        source={organizer}
    />, document.getElementById('reactEntry')
);
