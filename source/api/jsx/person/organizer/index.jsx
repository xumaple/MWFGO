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
            redirect: null,
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
                console.log(data.events);
                this.setState({
                    events: data.events,
                    redirect: data.redirect,
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
            .catch(error => console.log(error));
    }

    handleDelete(id) {

    }

    eventUrl(url, id) {
        return url.concat('events/', id, '/');
    }

    render(){
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
                                    onDelete: this.handleDelete,
                                }
                            }
                            key={id}
                        />
                    </div>
                ))}
                <div className="trait">
                    <div className ="trait-in"><Button onClick={(e) => {this.newEvent()}}>
                        New Event
                    </Button></div>
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Index;