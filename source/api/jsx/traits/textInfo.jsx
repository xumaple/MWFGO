import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../utility/textBox';

class TextInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: props.props.role,
            setAnswer: props.props.setAnswer, // Calls setContext everytime context is updated
            getAnswer: props.props.getAnswer, // Calls getContext in componentDidMount
            answer: ''
        }

        this.editAnswer = this.editAnswer.bind(this);

        this.renderMember = this.renderMember.bind(this);
        this.renderLeader = this.renderLeader.bind(this);
        this.renderOrganizer = this.renderOrganizer.bind(this);
    }

    componentDidMount() {
        if (this.props.props.getAnswer) {
            setTimeout(() => {this.setState({answer: this.props.props.getAnswer()});}, 100);
        }
    }

    componentDidUpdate() {
        // this.componentDidMount();
    }

    editAnswer(newAnswer) {
        this.setState({ answer: newAnswer });
        this.state.setAnswer(newAnswer);
    }

    renderMember() {
        if (this.state.role === 'member') {
            return (
                <div>
                    <TextBox
                        defaultValue=''
                        value={this.state.answer}
                        editValue={this.editAnswer}
                        limit={50}
                        updateValue={true}
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
        if (this.state.role === 'result') {
            // if (this.state.answer === undefined) {
            //     this.setState({answer: this.props.props.getAnswer()});

            // }
            return (<td>{this.state.answer}</td>);
        }
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
        getAnswer: PropTypes.func,
        setAnswer: PropTypes.func,
    }).isRequired,
};

export default TextInfo;