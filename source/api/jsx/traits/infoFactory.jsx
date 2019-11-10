import React from 'react';
import PropTypes from 'prop-types';
import TextInfo from './textInfo'
import ChoiceInfo from './choiceInfo'

function InfoFactory(props) {
    if (props.formType - 3 === 0) {
        // return (<div>hi</div>);
        return (<TextInfo props={props} />);
    }
    if (props.formType - 1 === 0) {
        return (<ChoiceInfo props={props} />);
    }
    return (<div></div>);
}

export function FormType(props) {
    return (
        <form className="form-group">
            <select className="form-control" value={props.type} onChange={props.handleType}>
                <option value={0}>Select type of form</option>
                <option value={1}>Multiple choice</option>
                <option value={2}>Time frame</option>
                {props.showOption ? (<option value={3}>Text box</option>) : ''}
            </select>
        </form>
    );
}

InfoFactory.propTypes = {
    formType: PropTypes.number.isRequired,
    role: PropTypes.string.isRequired,
    getContext: PropTypes.string.isRequired,
    setContext: PropTypes.string.isRequired,
};

FormType.propTypes = {
    type: PropTypes.number.isRequired,
    handleType: PropTypes.func.isRequired,
    showOption: PropTypes.bool.isRequired,
}

export default InfoFactory;
// export function FormType;