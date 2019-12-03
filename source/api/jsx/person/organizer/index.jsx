import React from 'react';
import Event from './event';
import PropTypes from 'prop-types';
import { Button, Alert } from 'reactstrap';
import SubmitModal from '../../utility/submitModal'

// import Limiters from '../limiters/limiters';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            events: [],
            errorAlert: false
        };

        this.newEvent = this.newEvent.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.eventUrl = this.eventUrl.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    events: data.events,
                });
            })
            .catch(error => console.log(error));
    }

    newEvent() {
        fetch(this.props.url, {
            method: 'post',
            credentials: 'same-origin',
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                if (!response.redirected) {
                    throw Error("Did not redirect on submission");
                }
                console.log(response);
                window.location.href = response.url;
            })
            .catch((error) => {
                console.log(error);
                this.setState({ errorAlert: true });
            })
    }

    handleDelete(id) {
        console.log(id);
        fetch(this.props.url, {
            method: 'delete',
            credentials: 'same-origin', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id': id,
            }),
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return;
            })
            .then(() => {
                let newEvents = this.state.events.slice(0);
                newEvents.splice(newEvents.indexOf(id), 1);
                this.setState({ events: newEvents, errorAlert: false })
            })
            .catch((error) => {
                console.log(error);
                this.setState({ errorAlert: true });
            })
    }

    eventUrl(url, id) {
        return url.concat('events/', id, '/');
    }

    render() {
        return(
            <div>
                <Alert color="primary" isOpen={this.state.errorAlert} toggle={() => {this.setState({ errorAlert: false, })}} >
                    Error. Could not reach server.
                </Alert>
                {this.state.events.map((id) => (
                    <div>
                        <Event
                            url={this.eventUrl(this.props.url, id)}
                            source={this.eventUrl(this.props.source, id)}
                            preview = {
                                {
                                    id: id,
                                    onDelete: this.handleDelete,
                                }
                            }
                            key={id}
                        />
                    </div>
                ))}
                {this.state.events.length === 0 ? <div style={{textAlign: 'center', padding: '10px'}}>You have no saved events.</div> : ''}
                <div className="submit-button">
                    <Button onClick={(e) => {this.newEvent()}}>
                        New Event
                    </Button>
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Index;