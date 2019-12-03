import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LIMIT_THRESHOLD = 8;

class TextBox extends React.Component {

    constructor(props) {
        super(props);
        let { value, defaultValue, limit } = props;
        this.state = {value: value ? value : '', showAlert: false};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault()
        const newValue = this.props.limit - e.target.value.length >= 0 ? e.target.value : this.state.value;
        const show = e.target.value.length * LIMIT_THRESHOLD > this.props.limit * (LIMIT_THRESHOLD - 1)
        this.setState({ value: newValue, showAlert: show });
        this.props.editValue(newValue);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.value);
        }
    }
    
    render() {
        let currValue = this.state.value;
        if (this.props.updateValue) {
            currValue = this.props.value;
        }
        return (
            <div>
                <Alert color="primary" isOpen={this.state.showAlert}>
                    Warning: {this.limit} character limit. {this.props.limit - this.state.value.length} characters remaining.
                </Alert>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder={this.props.defaultValue}
                        className="text-box" 
                        onChange={this.handleChange}
                        style={this.props.style}
                        value={currValue}
                    />
                </form> 
            </div>
        );
    }
}

TextBox.propTypes = {
    defaultValue: PropTypes.string.isRequired, 
    value: PropTypes.string,
    editValue: PropTypes.func.isRequired,
    style: PropTypes.object,
    limit: PropTypes.number.isRequired,
    updateValue: PropTypes.bool,
    onSubmit: PropTypes.func,
};

export default TextBox;