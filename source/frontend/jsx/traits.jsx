import React from 'react';
import PropTypes from 'prop-types';
import Trait from './trait';


class Traits extends React.Component {
    /*Display organizer's page*/
    
    constructor(props) {
        super(props);
        state = {
            traits: [],
            value: '',
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTraits = this.getTraits.bind(this);
    }

    getTraits() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    traits: data.traits,
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getTraits();
    }

    handleDelete() {
        event.preventDefault();
        this.getTraits();
    }

    handleSubmit(event) {
        event.preventDefault();
        const request = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ name: this.state.value }),
            credentials: 'same-origin',
        };
        fetch(this.props.url, request)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(() => {
                this.setState(prevState => ({
                    traits: prevState.traits.concat({id: data.id}),
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
            <div className='traits'>
                {this.state.traits.map(trait => (
                    <Trait
                     url={`${this.props.url}${trait.id}/`}
                     onDelete={this.handleDelete}
                    />
                ))}
                <form id="new-trait-form" onSubmit={this.handleSubmit}>
                    <input
                     type="text"
                     value={this.state.value}
                     onChange={this.handleChange}
                    />
                    <button type="submit">
                        Add
                    </button>
                </form>
            </div>
            
        );
    }
}

Traits.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Traits;
