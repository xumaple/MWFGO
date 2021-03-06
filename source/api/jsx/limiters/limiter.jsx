import React from 'react';
import PropTypes from 'prop-types';

class Limiter extends React.Component {

    constructor(props) {
        super(props);
        //for expression; exactly: 0, no more than: 1
        this.state = { name: '', show: false, id: 0, expression: false, number: 0, constraints: [] };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSubmit.bind(this);
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
                    id: data.id,
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
                this.setState({
                    show: false,
                });
            })
            .catch(error => console.log(error));
    }

    handleDetails() {
        this.setState({
            show: true,
        });
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
            <div>
                <input type='radio' id={constraint.id} value={constraint.name} onChange={this.handleConstraint}/>
                {constraint.name}<br />
            </div>  
        ));
        return(
            <div>
                { this.state.show ? (
                    <div>

                        <div>
                            <p>Please select the constraint that you want to limit in each group.</p>
                            <form>
                                {constraintsList}
                            </form>
                        </div>

                        <div>
                            <p>Please select an expression.</p>
                            <form>
                                <div>
                                    <input type='radio' value='exactly' onChange={this.handleExpression}/>
                                    exactly
                                </div>
                                <div>
                                    <input type='radio' value='noMoreThan' onChange={this.handleExpression}/>
                                    no more than<br />
                                </div>
                            </form>
                        </div>    

                        <div>
                            <form>
                                <input
                                 type="text"
                                 pattern="[0-9]*"
                                 value={this.state.number}
                                 onChange={this.handleNumber}
                                />
                            </form>
                        </div>            
                    
                        <button onClick={this.handleSave}>
                            Save Limiter
                        </button>
                        
                        <button onClick={this.handleDelete}>
                            Delete Limiter
                        </button>
                    </div>                   
                ) : (
                    <div>
                        {this.state.name}
                        <button onClick={this.handleDetails}>
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