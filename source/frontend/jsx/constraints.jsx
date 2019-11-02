import React from 'react';
import PropTypes from 'prop-types';

class Constraint extends React.Component {

    constructor(props) {
        super(props);
        this.state = { id: this.props.id, name: this.props.name, saved: true };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // componentDidMount() {
    //     fetch(this.props.url, { credentials: 'same-origin' }) //TODO: Change the url
    //         .then((response) => {
    //             if (!response.ok) throw Error(response.statusText);
    //             return response.json();
    //         })
    //         .then((data) => {
    //             this.setState({
    //                 constraint: data.constraint,
    //                 saved: true,
    //             });
    //         })
    //         .catch(error => console.log(error));
    // }

    handleDelete(event) {
        event.preventDefault();
        const request = {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE',
            body: JSON.stringify({ id: this.state.id }),
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
                id: this.state.id,
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
            <div className='constraint'>
                <form id='constraint-form' onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    { this.state.saved ? null : <button type="submit" value="Save" /> }
                </form>
                <button className='delete' onClick={this.handleDelete}>
                    Delete
                </button>
            </div>
        );    
    }
}


class Constraints extends React.Component {
    /*Display organizer's page*/
    
    constructor(props) {
        super(props);
        state = {
            constraints: [],
            value: '',
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getConstraints = this.getConstraints.bind(this);
    }

    getConstraints() {
        fetch(this.props.url, { credentials: 'same-origin' }) //TODO: Change the url
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    constraints: data.constraints,
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getConstraints();
    }

    handleDelete() {
        event.preventDefault();
        this.getConstraints();
    }

    handleSubmit(event) {
        event.preventDefault();
        const request = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ name: this.state.value }),
            credentials: 'same-origin',
        };
        fetch(this.props.url, request) //TODO: Change the url
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(() => {
                this.setState(prevState => ({
                    constraints: prevState.constraints.concat({id: data.id, name: data.name}),
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
            <div className='constraints'>
                {this.state.constraints.map(constraint => (
                    <Constraint
                     id={constraint.id}
                     name={constraint.name}
                     onDelete={this.handleDelete}
                    />
                ))}
                <form id="new-constraint-form" onSubmit={this.handleSubmit}>
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

Constraint.propTypes = {
    url: PropTypes.string.isRequired,
};
Constraints.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Constraint;
export default Constraints
