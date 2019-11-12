import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../utility/textBox';

class TextInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: props.props.role,
            setContext: props.props.setContext, // Calls setContext everytime context is updated
            getContext: props.props.getContext, // Calls getContext in componentDidMount
            answer: ''
        }

        this.editAnswer = this.editAnswer.bind(this);

        this.renderMember = this.renderMember.bind(this);
        this.renderLeader = this.renderLeader.bind(this);
        this.renderOrganizer = this.renderOrganizer.bind(this);
    }

    componentDidMount() {
        this.setState({answer: this.state.getContext()});
    }

    editAnswer(newAnswer) {
        this.setState({ answer: newAnswer });
        this.state.setContext(newAnswer);
    }

    renderMember() {
        if (this.state.role === 'member') {
            return (
                <div>
                    <TextBox
                        defaultValue=''
                        value={this.state.name}
                        editValue={this.editAnswer}
                        limit={50}
                    />
                </div>
            );
        }
        else return '';
    }

    renderLeader() {
        return '';
    }

    renderOrganizer() {
        return '';
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