import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Choices from './choices';
import TextBox from '../textBox';
import InfoFactory, { FormType } from './infoFactory';


class Trait extends React.Component {

    constructor(props) {
        super(props);
        //for formType; Multiple Choice: 1, Time Frames: 2, Text Boxes: 3
        this.state = { name: null, id: props.id, isConstraint: false, formType: 0, showAlert: false, context: null, unsavedChanges: false, deleted: false, };

        this.editValue = this.editValue.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleIsConstraint = this.handleIsConstraint.bind(this);
        this.getContext = this.getContext.bind(this);
        this.setContext = this.setContext.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update()
    }

    update() {
        if (!this.props.editing && this.state.unsavedChanges) {
            // TODO send post/patch request
            this.setState({ unsavedChanges: false })
        }
        else {
            fetch(this.props.url, { credentials: 'same-origin' }) //TODO: Change the url
                .then((response) => {
                    if (!response.ok) throw Error(response.statusText);
                    return response.json();
                })
                .then((data) => {
                    this.setState({
                        name: data.name,
                        isConstraint: !!+data.isConstraint,
                        formType: data.formType,
                        context: data.context,
                        unsavedChanges: false,
                    });
                })
                .catch(error => console.log(error));
        }
    }

    editValue(newName) {
        this.setState({ name: newName, unsavedChanges: true });
    }

    handleIsConstraint(event) {
        let newState = {isConstraint: !!+event.target.value, showAlert: false, unsavedChanges: true};
        if (event.target.value && this.state.formType - 3 === 0) {
            newState.formType = 0;
            newState['showAlert'] = true;
        }
        this.setState(newState);
    }

    handleType(event) {
        this.setState({formType: event.target.value, showAlert: false, unsavedChanges: true});
    }

    getContext() {
        console.log(this.state.context);
        return this.state.context;
    }

    setContext(context) {
        console.log(context);
        this.setState({context: context, unsavedChanges: true});
    }
    
    render() {
        if (this.state.deleted) {
            return (<div></div>);
        }
        if (!this.props.editing) {
            if (this.state.unsavedChanges) {
                this.update();
            }
            return (
                <div className='notShowTrait'>
                    {this.state.name} <Button className='details' style={{float: 'right'}} onClick={(event) => {
                        this.props.onEdit(this.state.id); 
                    }}>
                        Edit details
                    </Button>
                </div>
            );
        }
        return (
            <div>
                <TextBox 
                    defaultValue='Name'
                    value={this.state.name}
                    editValue={this.editValue}
                    style={{fontSize:'30px', width:'100%'}}
                    limit={50}
                />

                <div className='isConstraintCheckBox'>
                    <form className='form-group'>
                        This is a constraint
                        <span>
                            <select className='form-control' value={this.state.isConstraint ? 1 : 0} defaultChecked={this.state.isConstraint} onChange={this.handleIsConstraint}>
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </span>
                    </form>
                </div>
                <Alert color="primary" isOpen={this.state.showAlert} toggle={() => {this.setState({ showAlert: false, })}} >
                    Constraints cannot be of type Text Box. Please select another option.
                </Alert>
                <div className='traitType'>
                    <FormType
                        type={this.state.formType}
                        handleType={this.handleType}
                        showOption={!this.state.isConstraint}
                    />
                </div>

                <div>
                    <InfoFactory
                        formType={this.state.formType} 
                        role='organizer' 
                        getContext={this.getContext} 
                        setContext={this.setContext} 
                    />
                </div>

                <Button className='details' onClick={(event) => {
                    this.props.onSave(this.state.id); 
                }}>
                    Save
                </Button>
                <Button className='details' onClick={(event) => { this.setState({deleted: true});
                    this.props.onDelete(this.state.id); 
                }}>
                    Delete
                </Button>


            </div>
        );    
    }
}

Trait.propTypes = {
    url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    editing: PropTypes.bool.isRequired, // TODO change to boolean?
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default Trait;