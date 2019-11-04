import React from 'react';
import PropTypes from 'prop-types';
import { cachedDataVersionTag } from 'v8';


class Limiters extends React.Component {
    /*Display organizer's page*/
    
    constructor(props) {
        super(props);
        state = {
            limiters: [],
            name: '',
            id: 0,
            expression: false,
            number: 0,
            constraints: [],
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleConstraint = this.handleConstraint.bind(this);
        this.getLimiters = this.getLimiters.bind(this);
        this.handleExpression = this.handleExpression.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
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
                    constraints: data.constraints
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
            body: JSON.stringify({
                name: this.state.name,
                id: this.state.id,
                expression: this.state.expression,
                number: this.state.number               
            }),
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
                    name: '',
                    id: 0,
                    expression: false,
                    number: 0,
                }));
            })
            .catch(error => console.log(error));
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleConstraint(event) {
        this.setState({
            name: event.target.value,
            id: event.target.id,
        });
    }

    handleExpression(event) {
        if(event.target.value === "exactly"){
            this.setState({
                expression: false,
            });
        }
        else {
            this.setState({
                expression: true,
            });
        }
    }

    handleNumber(event) {
        this.setState({
            number: Number(event.target.value)
        });
    }
    
    render() {
        const constraintsList = this.state.constraints.map(constraint => (
            <input type='radio' id={constraint.id} value={constraint.name} onChange={this.handleConstraint}>{constraint.name}</input>   
        ));

        return(
            <div className='limiters'>
                {this.state.limiters.map(limiter => (
                    <Limiter
                     url={`${this.props.url}${limiter.id}/`}
                     onDelete={this.handleDelete}
                    />
                ))}
                <form id="new-limiter-form" onSubmit={this.handleSubmit}>
                    <div className='constraintName'>
                        <p>Please select the constraint that you want to limit in each group.</p>
                        <form>
                            {constraintsList}
                        </form>
                    </div>

                    <form>
                        <input type='radio' value='exactly' onChange={this.handleExpression}>exactly</input>
                        <input type='radio' value='noMoreThan' onChange={this.handleExpression}>no more than</input>
                    </form>

                    <form>
                        <input
                         type="text"
                         pattern="[0-9]*"
                         value={this.state.number}
                         onChange={this.handleNumber}
                        />
                    </form>
                    
                    <button type="submit">
                        Add Limiter
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
