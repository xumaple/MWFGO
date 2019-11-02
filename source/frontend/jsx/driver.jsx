import React from 'react';
import PropTypes from 'prop-types';

class driverForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { constraint: '', saved: true };

    }

    componentDidMount() {
        fetch(this.props.url, { credentials: 'same-origin' }) //TODO: Change the url
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    constraint: data.constraint,
                    saved: true,
                });
            })
            .catch(error => console.log(error));
    }

    handleSubmit(event){
        const request = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ text: this.state.constraint }),
            credentials: 'same-origin',
        };
        fetch(this.props.url, request) //TODO: Change the url
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    saved: true,
                });
            })
            .catch(error => console.log(error));
            event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            constraint: event.target.value,
            saved: false,
        });
    }
    
    render() {
        return(
            <div className='constraint'>
                <form id="constraint-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.constraint}
                        onChange={this.handleChange}
                    />
                    { this.state.saved ? null : <input type="submit" value="Save" /> }
                </form>
            </div>
        );    
    }
}

class driver extends React.Component {
    /*Display driver's page*/
    constructor(props) {
        super(props);
        this.state = { constraints: [] };
    }
}