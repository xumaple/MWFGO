import React from 'react';
import PropTypes from 'prop-types';


class Limiters extends React.Component {
    /*Display organizer's page*/
    
    constructor(props) {
        super(props);
        state = {
            limiters: [],
            value: '',
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getLimiters = this.getLimiters.bind(this);
    }

    getLimiters() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    limiters: data.limiters,
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getLimiters();
    }

    handleDelete() {
        event.preventDefault();
        this.getLimiters();
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
                    limiters: prevState.limiters.concat({id: data.id}),
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
            <div className='limiters'>
                {this.state.limiters.map(limiter => (
                    <Limiter
                     url={`${this.props.url}${limiter.id}/`}
                     onDelete={this.handleDelete}
                    />
                ))}
                <form id="new-limiter-form" onSubmit={this.handleSubmit}>
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

Limiters.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Limiters;
