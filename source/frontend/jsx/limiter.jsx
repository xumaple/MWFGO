import React from 'react';
import PropTypes from 'prop-types';

class Limiter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', show: false, expression: false, number: 0, constraints: [] };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.handleConstraint = this.handleConstraint.bind(this);
        this.handleExpression = this.handleExpression.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
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
                    show: false,
                    expression: data.expression,
                    number: data.number,
                    constraints: data.constraints,
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
        fetch(this.props.url, request)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(() => {
                this.props.onDelete();
            })
            .catch(error => console.log(error));    
    }

    handleSave(event) {
        event.preventDefault();
        const request = {
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            body: JSON.stringify({
                name: this.state.name,
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
                this.setState({
                    show: false,
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

    handleDetails() {
        this.setState({
            show: true,
        });
    }

    handleConstraint(event) {
        this.setState({
            name: event.target.value,
        });
    }

    handleExpression(event) {
        if(event.target.value === "exactly"){
            this.setState({
                expression: 0,
            });
        }
        else {
            this.setState({
                expression: 1,
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
            <input type='radio' value={constraint.name} onChange={this.handleConstraint}>{constraint.name}</input>   
        ));
        return(
            <div className='limiter'>
                { this.state.show ? (
                    <div className='showLimiter'>

                        <div className='constraintName'>
                            <p>Please select the constraint that you want to limit in each group.</p>
                            <form>
                                {constraintsList}
                            </form>
                        </div>

                        <div className='expressionName'>
                            <p>Please select an expression.</p>
                            <form>
                                <input type='radio' value='exactly' onChange={this.handleExpression}>exactly</input>
                                <input type='radio' value='noMoreThan' onChange={this.handleExpression}>no more than</input>
                            </form>
                        </div>    

                        <div className='numberRestriction'>
                            <form>
                                <input
                                 type="text"
                                 pattern="[0-9]*"
                                 value={this.state.number}
                                 onChange={this.handleNumber}
                                />
                            </form>
                        </div>            
                    
                        <button className='save' onClick={this.handleSave}>
                            Save Limiter
                        </button>
                        
                        <button className='delete' onClick={this.handleDelete}>
                            Delete Limiter
                        </button>
                    </div>                   
                ) : (
                    <div className='notShowLimiter'>
                        {this.state.name}
                        <button className = 'details' onClick={this.handleDetails}>
                            Details
                        </button>
                    </div>
                )}
            </div>
        );    
    }
}

Limiter.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Limiter;