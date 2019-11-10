import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../textBox';

class TextInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: props.props.role,
            setContext: props.props.setContext, // Calls setContext everytime context is updated
            getContext: props.props.getContext, // Calls getContext in componentDidMount
            answer: ''
        }
        // super.getRole = super.getRole.bind(this);
        this.editAnswer = this.editAnswer.bind(this);
    }

    componentDidMount() {
        this.setState({answer: this.state.getContext()});
    }

    editAnswer(newAnswer) {
        this.setState({ answer: newAnswer });
        this.state.setContext(newAnswer);
    }

    render() { // How to bind and use super functions? super.getRole()?
        if (this.state.role === 'organizer') {
            return (<div></div>);
        }
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
        return (<div></div>);
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