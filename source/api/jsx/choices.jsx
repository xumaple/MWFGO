import React from 'react';
import PropTypes from 'prop-types';
import Choice from './choice';

class Choices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: [],
            value: '',
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getChoices = this.getChoices.bind(this);
    }

    getChoices() {
        fetch(this.props.url, { credentials: 'same-origin' }) //TODO: Change the url
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    choices: data.choices,
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getChoices();
    }

    handleDelete() {
        event.preventDefault();
        this.getChoices();
    }

    handleSubmit(event) {
        event.preventDefault();
        const request = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                name: this.state.value
            }),
            credentials: 'same-origin',
        };
        fetch(this.props.url, request) //TODO: Change the url
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(() => {
                this.setState(prevState => ({
                    choices: prevState.choices.concat({id: data.id}),
                    value: '',
                }));
            })
            .catch(error => console.log(error));
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    
    render() {

        return(
            <div className='choices'>
                {this.state.choices.map(choice => (
                    <Choice
                     url={`${this.props.url}${choice.id}/`}
                     onDelete={this.handleDelete}
                    />
                ))}
                <form id="new-choice-form" onSubmit={this.handleSubmit}>
                    <input
                     type="text"
                     value={this.state.value}
                     onChange={this.handleChange}
                    />
                    <button type="submit">
                        Add Choice
                    </button>
                </form>
            </div>
            
        );
    }
}

Choices.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Choices