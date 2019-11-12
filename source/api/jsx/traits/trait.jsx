import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Choices from './choices';
import TextBox from '../utility/textBox';
import InfoFactory, { FormType } from './infoFactory';

const TRAIT_DEFAULT_NAME = 'Name';

class Trait extends React.Component {

    constructor(props) {
        super(props);
        //for formType; Multiple Choice: 1, Time Frames: 2, Text Boxes: 3
        this.state = { name: TRAIT_DEFAULT_NAME, id: props.id, isConstraint: false, formType: 0, showConstraintAlert: false, showSaveErrorAlert: false, context: null, unsavedChanges: false, deleted: false, prevState: null };

        this.editValue = this.editValue.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleIsConstraint = this.handleIsConstraint.bind(this);
        this.getContext = this.getContext.bind(this);
        this.setContext = this.setContext.bind(this);
        this.update = this.update.bind(this);
        this.save = this.save.bind(this);
        this.deleteSelf = this.deleteSelf.bind(this);

        this.renderMember = this.renderMember.bind(this);
        this.renderLeader = this.renderLeader.bind(this);
        this.renderOrganizer = this.renderOrganizer.bind(this);

        this.savePrevState = this.savePrevState.bind(this);
        this.retrievePrevState = this.retrievePrevState.bind(this);
    }

    componentDidMount() {
        this.update()
    }

    update() {
        if (!this.props.editing && this.state.unsavedChanges) {
            this.save();
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
                        formType: Number(data.formType),
                        context: data.context,
                        unsavedChanges: false,
                    });
                })
                .catch(error => console.log(error));
        }
    }

    editValue(newName) {
        this.setState({ name: newName, unsavedChanges: true, prevState: this.savePrevState() });
    }

    handleIsConstraint(event) {
        let newState = {isConstraint: !!+event.target.value, showConstraintAlert: false, unsavedChanges: true, prevState: this.savePrevState() };
        if (event.target.value && this.state.formType - 3 === 0) {
            newState.formType = 0;
            newState['showConstraintAlert'] = true;
        }
        this.setState(newState);
    }

    handleType(event) {
        this.setState({formType: +event.target.value, showConstraintAlert: false, unsavedChanges: true, prevState: this.savePrevState() });
    }

    getContext() {
        if (this.props.getAnswer) {
            return this.props.getAnswer(this.state.id);
        }
        return this.state.context;
    }

    setContext(context) {
        this.setState({context: context, unsavedChanges: true, prevState: this.savePrevState() });
        if (this.props.role === 'organizer') {
            return;
        }
        this.props.setAnswer(this.state.id, context);
    }

    save() {
        const { name, isConstraint, formType, context, showSaveErrorAlert } = this.state;
        if (showSaveErrorAlert) {
            return;
        }
        fetch(this.props.url, {
            method: 'patch',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                isConstraint: isConstraint, 
                formType: formType,
                context: context,
            }),
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
            })
            .then(() => {
                this.setState({ unsavedChanges: false, prevState: this.savePrevState() });
                this.props.onSave(this.state.id);
            })
            .catch(() => { this.setState({ showSaveErrorAlert: true, unsavedChanges: true }); });
    }

    deleteSelf() {
        fetch(this.props.url, {
            method: 'delete',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return;
            })
            .catch(error => console.log(error));

        this.setState({deleted: true});
        this.props.onDelete(this.state.id); 
    }

    savePrevState() {
        if (this.state.prevState !== null) {
            return this.state.prevState;
        }
        const { name, isConstraint, formType, showConstraintAlert, showSaveErrorAlert, context } = this.state;
        return {
            name: name,
            isConstraint: isConstraint,
            formType: formType,
            showConstraintAlert: showConstraintAlert,
            showSaveErrorAlert: showSaveErrorAlert,
            context: context,
        };
    }

    retrievePrevState() {
        if (this.state.prevState === null) {
            console.log('No previous state saved');
            this.setState({showSaveErrorAlert: false, unsavedChanges: false});
            return;
        }
        const { name, isConstraint, formType, showConstraintAlert, showSaveErrorAlert, context } = this.state.prevState;
        this.setState({
            name: name,
            isConstraint: isConstraint,
            formType: formType,
            showConstraintAlert: showConstraintAlert,
            showSaveErrorAlert: showSaveErrorAlert, 
            context: context,
            unsavedChanges: false,
            prevState: null,
        });
    }

    renderMember() {
        if (this.props.role === 'member') {
            return (
                <div>
                    {this.state.name}
                    <InfoFactory
                        formType={this.state.formType}
                        role={this.props.role}
                        getContext={this.getContext}
                        setContext={this.setContext}
                    />
                </div>
            )
        }
        else return '';
    }

    renderLeader() {
        return '';
    }

    renderOrganizer() {
        if (this.props.role === 'organizer') {
            if (this.state.deleted) {
                return (<div></div>);
            }
            if (!this.props.editing) {
                if (this.state.unsavedChanges) {
                    this.update();
                }
                return (
                    <div className='notShowTrait'>
                        {this.state.name} <b>{this.state.isConstraint ? 'Constraint' : ''}</b> <Button className='details' style={{float: 'right'}} onClick={(event) => {
                            this.props.onEdit(this.state.id); 
                        }}>
                            Edit details
                        </Button>
                    </div>
                );
            }
            return (
                <div>
                    <Alert color="danger" isOpen={this.state.showSaveErrorAlert} toggle={() => {this.setState({ showSaveErrorAlert: false, })}} >
                        Error: Could not save constraint
                    </Alert>
                    <TextBox 
                        defaultValue={TRAIT_DEFAULT_NAME}
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
                    <Alert color="primary" isOpen={this.state.showConstraintAlert} toggle={() => {this.setState({ showConstraintAlert: false, })}} >
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
                            role={this.props.role} 
                            getContext={this.getContext} 
                            setContext={this.setContext} 
                        />
                    </div>

                    <Button className='details' onClick={(event) => { this.save(); }}>
                        Save
                    </Button>
                    <Button className='details' onClick={(event) => { 
                        this.retrievePrevState();
                        this.props.onSave(this.state.id);
                    }}>
                        Cancel
                    </Button>
                    <Button className='details' onClick={(event) => { this.deleteSelf(); }}>
                        Delete
                    </Button>
                </div>
            );
        }
        else return '';
    }
    
    render() {
        return (
            <div className="traitClass">
                {this.renderOrganizer()}
                {this.renderMember()}
                {this.renderLeader()}
            </div>
        );
    }
}

Trait.propTypes = {
    url: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    editing: PropTypes.bool, 
    onDelete: PropTypes.func,
    onSave: PropTypes.func,
    onEdit: PropTypes.func,
    getAnswer: PropTypes.func,
    setAnswer: PropTypes.func,
};

export default Trait;