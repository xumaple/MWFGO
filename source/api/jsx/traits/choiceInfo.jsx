import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Choice from './choice';

class TextInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: props.props.role,
            setContext: props.props.setContext, // Calls setContext everytime context is updated
            getContext: props.props.getContext, // Calls getContext in componentDidMount
            choices: [],
        }
        // super.getRole = super.getRole.bind(this);
        this.removeChoice = this.removeChoice.bind(this);
        this.editChoice = this.editChoice.bind(this);
        this.setContextHelper = this.setContextHelper.bind(this);
        this.getContext = this.getContext.bind(this);

        this.renderMember = this.renderMember.bind(this);
        this.renderLeader = this.renderLeader.bind(this);
        this.renderOrganizer = this.renderOrganizer.bind(this);
    }

    componentDidMount() {
        let choices = this.state.getContext();
        if (choices !== undefined && choices !== null) {
            this.setState({ choices: choices, });
        }
    }

    removeChoice(index) {
        let newChoices = this.state.choices.slice(0);
        newChoices.splice(index, 1);
        this.setContextHelper(newChoices);
    }

    editChoice(index, newAnswer) {
        let newChoices = this.state.choices.slice(0);
        newChoices[index] = newAnswer;

        this.setContextHelper(newChoices);
    }

    setContextHelper(newChoices) {
        this.setState({ choices: newChoices, });
        this.state.setContext(newChoices);
    }

    getContext(index) {
        return this.state.choices[index];
    }

    renderMember() {
        if (this.state.role === 'member') {
            return (
                <div>
                    
                </div>
            );
        }
        else return '';
    }

    renderLeader() {
        return '';
    }

    renderOrganizer() {
        if (this.state.role === 'organizer') {
            return (
                <div>
                    Choices: 
                    {this.state.choices.map((choice, index) => (
                        <Choice
                            key={index}
                            index={index}
                            name={choice}
                            onDelete={this.removeChoice}
                            onEdit={this.editChoice}
                            getContext={this.getContext}
                            role={this.state.role}
                        />
                    ))}
                    <Button color="primary" onClick={(event) => {
                        this.setContextHelper(this.state.choices.concat(''));
                    }}>
                        New choice
                    </Button>
                </div>
            );
        }
        else return '';
    }
    
    render() {
        return (
            <div>
                {this.renderOrganizer()}
                {this.renderMember()}
                {this.renderLeader()}
            </div>
        );
    }
}

TextInfo.propTypes = {
    props: PropTypes.shape({
        role: PropTypes.string.isRequired,
        setContext: PropTypes.func.isRequired,
        getContext: PropTypes.func.isRequired,
    }).isRequired,
};

export default TextInfo;