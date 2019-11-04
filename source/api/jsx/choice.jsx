import React from 'react';
import PropTypes from 'prop-types';

class Choice extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', saved: true };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url, { credentials: 'same-origin' }) //TODO: Change the url
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    name: data.name,
                    saved: true,
                });
            })
            .catch(error => console.log(error));
    }

    handleDelete(event) {
        event.preventDefault();
        const request = {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE',
            credentials: 'same-origin',
        };
        fetch(this.props.url, request) //TODO: Change the url
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(() => {
                this.props.onDelete();
            })
            .catch(error => console.log(error));    
    }

    handleSubmit(event) {
        event.preventDefault();
        const request = {
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            body: JSON.stringify({
                name: this.state.name
            }),
            credentials: 'same-origin',
        };
        fetch(this.props.url, request) //TODO: Change the url
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(() => {
                this.setState({
                    saved: true,
                });
            })
            .catch(error => console.log(error));
    }

    handleChange(event) {
        this.setState({
            name: event.target.value,
            saved: false,
        });
    }
    
    render() {
        return(
            <div className='choice'>
                <form id='choice-form' onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    { this.state.saved ? null : <button type="submit" value="Save Choice" /> }
                </form>
                <button className='delete' onClick={this.handleDelete}>
                    Delete Choice
                </button>
            </div>
        );    
    }
}

Choice.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Choice;