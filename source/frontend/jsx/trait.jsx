import React from 'react';
import PropTypes from 'prop-types';

class Trait extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', show: false, isConstraint: false, formType: 0 };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
        this.handleMC = this.handleMC.bind(this);
        this.handleTF = this.handleTF.bind(this);
        this.handleTB = this.handleTB.bind(this);
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
                    isConstraint: data.isConstraint,
                    formType: data.formType,
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

    handleSave(event) {
        event.preventDefault();
        if(this.state.formType === 0) {
            alert("Please select a Form Type.");
        }
        const request = {
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            body: JSON.stringify({
                name: this.state.name,
                isConstraint: this.state.isConstraint,
                formType: this.state.formType
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

    handleChangeCheckBox() {
        let formType = 0;
        if (this.formType === 1) {
            formType = 1;
        }
        else if (this.formType === 2) {
            formType = 2;
        }
        this.setState(prevState => ({
            isConstraint: !prevState.isConstraint,
            formType: formType,
        }));
    }

    handleMC() {
        this.setState({
            formType: 1,
        });
    }

    handleTF() {
        this.setState({
            formType: 2,
        });
    }

    handleTB() {
        this.setState({
            formType: 3,
        });
    }
    
    render() {
        return(
            <div className='trait'>
                { this.state.show ? (
                    <div className='showTrait'>

                        <div className='traitName'>
                            <form id='constraint-form'>
                                <input
                                 type="text"
                                 value={this.state.name}
                                 onChange={this.handleChange}
                                />
                            </form> 
                        </div>

                        <div className='isConstraintCheckBox'>
                            <input type='checkbox' defaultChecked={this.state.isConstraint} onChange={this.handleChangeCheckBox} />
                        </div>

                        <div className='typeOfForm'>
                            <p>Please select the type of form that is appropriate for this trait.</p>
                            <form>
                                { this.state.formType === 1 ? (
                                    <input type='radio' name='formType' value='multipleChoice' onChange={this.handleMC} checked='checked'>Multiple Choice</input>
                                ) : (
                                    <input type='radio' name='formType' value='multipleChoice' onChange={this.handleMC}>Multiple Choice</input>
                                )}
                                { this.state.formType === 2 ? (
                                    <input type='radio' name='formType' value='timeFrame' onChange={this.handleTF} checked='checked'>Time Frame</input>
                                ) : (
                                    <input type='radio' name='formType' value='timeFrame' onChange={this.handleTF}>Time Frame</input>
                                )}
                                
                                { this.state.isConstraint ? (
                                    null
                                ) : (                                
                                    this.state.formType === 3 ? (
                                        <input type='radio' name='formType' value='textBox' onChange={this.handleTB} checked='checked'>Text Box</input>
                                    ) : (
                                        <input type='radio' name='formType' value='textBox' onChange={this.handleTB}>Text Box</input>
                                    )                                  
                                )}
                            </form>
                        </div>

                        <div className='formTypeIsMC'>
                            {this.state.formType === 1 ? (
                                <div>
                                    <Choices
                                     url={`${this.props.url}choices/`}
                                    />
                                </div>
                            ) : (
                                null
                            )}                            
                        </div>                      
                    
                        <button className='save' onClick={this.handleSave}>
                            Save Trait
                        </button>
                        <button className='delete' onClick={this.handleDelete}>
                            Delete Trait
                        </button>
                    </div>
                    
                ) : (
                    <div className='notShotTrait'>
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

Trait.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Trait;