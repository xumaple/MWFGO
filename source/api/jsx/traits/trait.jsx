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
        this.state = {
            name: TRAIT_DEFAULT_NAME,
            question: '',
            id: props.id,
            isConstraint: false,
            formType: 0,
            showConstraintAlert: false,
            showSaveErrorAlert: 0,
            context: null,
            unsavedChanges: false,
            deleted: false,
            prevState: null
        };

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

        this.updateState = this.updateState.bind(this);
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
                        question: data.question,
                        isConstraint: !!+data.isConstraint,
                        formType: Number(data.formType),
                        context: data.context,
                        unsavedChanges: false,
                    }, () => {
                        this.setState({ prevState : this.savePrevState() })
                    });
                })
                .catch(error => console.log(error));
        }
    }

    updateState(newState) {
        newState.unsavedChanges = true;
        newState.prevState = this.savePrevState();
        this.setState(newState);
    }

    handleIsConstraint(event) {
        let newState = {isConstraint: !!+event.target.value, showConstraintAlert: false };
        if (event.target.value && this.state.formType - 3 === 0) {
            newState.formType = 0;
            newState['showConstraintAlert'] = true;
        }
        this.updateState(newState);
    }

    getContext() {
        return this.state.context;
    }

    setContext(context) {
        this.updateState({ context: context });
    }

    save() {
        const { name, question, isConstraint, formType, context, showSaveErrorAlert } = this.state;
        fetch(this.props.url, {
            method: 'patch',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': name,
                'question': question, 
                'isConstraint': isConstraint, 
                'formType': formType,
                'context': context,
            }),
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
            })
            .then(() => {
                this.setState({ unsavedChanges: false, prevState: this.savePrevState() });
                this.props.onSave(this.state.id);
            })
            .catch(() => { this.setState({ showSaveErrorAlert: this.state.showSaveErrorAlert + 1, unsavedChanges: true }); });
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
            this.setState({showSaveErrorAlert: 0, unsavedChanges: false});
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
            console.log(this.state.context)
            if (this.state.formType === 0) {
                return '';
            }
            return (
                <div>
                    {this.state.question}
                    <InfoFactory
                        formType={this.state.formType}
                        role={this.props.role}
                        getAnswer={() => {return this.props.getAnswer(this.state.id);}}
                        setAnswer={(answer) => {this.props.setAnswer(this.state.id, answer);}}
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
            const { name, question, formType, isConstraint, showConstraintAlert, showSaveErrorAlert } = this.state;
            return (
                <div>
                    <Alert color="danger" isOpen={showSaveErrorAlert > 0} toggle={() => {this.setState({ showSaveErrorAlert: 0, })}} >
                        Error: Could not save constraint {showSaveErrorAlert > 1 ? 'x'.concat(showSaveErrorAlert) : ''}
                    </Alert>
                    <TextBox 
                        defaultValue={TRAIT_DEFAULT_NAME}
                        value={name}
                        editValue={(newName) => { this.updateState({ name: newName }); }}
                        style={{fontSize:'30px', width:'100%'}}
                        limit={50}
                    />
                    <TextBox
                        defaultValue=''
                        value={question}
                        editValue={(newQuestion) => { this.updateState({ question: newQuestion }); }}
                        style={{width: '100%'}}
                        limit={100}
                    />

                    <div className='isConstraintCheckBox'>
                        <form className='form-group'>
                            This is a constraint
                            <span>
                                <select className='form-control' value={isConstraint ? 1 : 0} defaultChecked={this.state.isConstraint} onChange={this.handleIsConstraint}>
                                    <option value={0}>No</option>
                                    <option value={1}>Yes</option>
                                </select>
                            </span>
                        </form>
                    </div>
                    <Alert color="primary" isOpen={showConstraintAlert} toggle={() => {this.setState({ showConstraintAlert: false, })}} >
                        Constraints cannot be of type Text Box. Please select another option.
                    </Alert>
                    <div className='traitType'>
                        <FormType
                            type={this.state.formType}
                            handleType={(event) => { this.updateState({ formType: +event.target.value, showConstraintAlert: false }); }}
                            showOption={!isConstraint}
                        />
                    </div>

                    <div>
                        <InfoFactory
                            formType={formType} 
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