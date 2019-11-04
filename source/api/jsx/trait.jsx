import React from 'react';
import PropTypes from 'prop-types';
import Choices from './choices';

class Trait extends React.Component {

    constructor(props) {
        super(props);
        //for formType; Multiple Choice: 1, Time Frames: 2, Text Boxes: 3 
        this.state = { name: '', id: -1, show: false, isConstraint: false, formType: 0 };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSuperSave = this.handleSuperSave.bind(this);
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
                let tmp = false;
                if(data.id === -1) {
                    tmp = true;
                }
                this.setState({
                    name: data.name,
                    id: data.id,
                    show: tmp,
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

    handleSuperSave() {
        if(this.state.formType === 0) {
            alert("Please select a Form Type.");
        }
        else {
            const request = {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
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
                        name: '',
                        id: -1,
                        isConstraint: false,
                        formType: 0,
                    });
                })
                .then(() => {
                    this.props.onSave();
                })
                .catch(error => console.log(error));
        }
    }

    handleSave(event) {
        event.preventDefault();
        if(this.state.id === -1){
            this.handleSuperSave();
        }
        else{
            if(this.state.formType === 0) {
                alert("Please select a Form Type.");
            }
            else {
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
        }       
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
        console.log("here");
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
                            <p>This is a Constraint</p>
                            <input type='checkbox' defaultChecked={this.state.isConstraint} onChange={this.handleChangeCheckBox} />
                        </div>

                        <div className='typeOfForm'>
                            <p>Please select the type of form that is appropriate for this trait.</p>
                            <form>
                                { this.state.formType === 1 ? (
                                    <div>
                                        <input type='radio' name='formType' value='multipleChoice' onChange={this.handleMC} checked='checked'/>
                                        Multiple Choice<br />
                                    </div>
                                ) : (
                                    <div>
                                        <input type='radio' name='formType' value='multipleChoice' onChange={this.handleMC}/>
                                        Multiple Choice<br />
                                    </div>
                                )}
                                { this.state.formType === 2 ? (
                                    <div>
                                        <input type='radio' name='formType' value='timeFrame' onChange={this.handleTF} checked='checked'/>
                                        Time Frame<br />
                                    </div>
                                ) : (
                                    <div>
                                        <input type='radio' name='formType' value='timeFrame' onChange={this.handleTF}/>
                                        Time Frame<br />
                                    </div>
                                )}
                                
                                { this.state.isConstraint ? (
                                    null
                                ) : (                                
                                    this.state.formType === 3 ? (
                                        <div>
                                            <input type='radio' name='formType' value='textBox' onChange={this.handleTB} checked='checked'/>
                                            Text Box<br />
                                        </div>
                                    ) : (
                                        <div>
                                            <input type='radio' name='formType' value='textBox' onChange={this.handleTB}/>
                                            Text Box<br />
                                        </div>
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
                        {this.state.id === -1 ? (
                            null
                        ) : (
                            <button className='delete' onClick={this.handleDelete}>
                                Delete Trait
                            </button>
                        )}
                        
                    </div>
                    
                ) : (
                    <div className='notShowTrait'>
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