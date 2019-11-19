import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LIMIT_THRESHOLD = 8;

class TextBox extends React.Component {

    constructor(props) {
        super(props);
        let { value, defaultValue, limit } = props;
        this.state = {value: value ? value : defaultValue, showAlert: false};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.style = this.style.bind(this);
    }

    handleChange(e) {
        e.preventDefault()
        let newValue = this.props.limit - e.target.value.length >= 0 ? e.target.value : this.state.value;
        if (newValue === this.state.value.slice(0, -1) && this.state.value === this.props.defaultValue) {
            newValue = ''
        }
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

    style(currValue) {
        let retStyle = {}
        if (this.props.style) {
            retStyle = this.props.style;
        }
        if (this.props.defaultValue === currValue) {
            retStyle.color = '#D3D3D3';
        }
        return retStyle;
    }
    
    render() {
        let currValue = this.state.value;
        if (this.props.updateValue) {
            let { value } = this.props;
            currValue = value ? value : this.props.defaultValue;
        }
        return (
            <div>
                <Alert color="primary" isOpen={this.state.showAlert}>
                    Warning: {this.limit} character limit. {this.props.limit - this.state.value.length} characters remaining.
                </Alert>
                <form onSubmit={this.handleSubmit}>
                    <input
                     type="text"
                     onChange={this.handleChange}
                     style={this.style(currValue)}
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