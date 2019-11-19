import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../utility/textBox';
import { Alert, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CHOICE_QUESTION_SIZE_LIMIT = 30;

function Choice(props) {
    const { index, name, onDelete, onEdit, role } = props;
    if (role === 'organizer') {
        return(
            <div>
                <div style={{display: 'inline-block'}} id='choice-form'>
                    <TextBox
                        defaultValue=''
                        value={name}
                        editValue={(newValue) => {onEdit(index, newValue)}}
                        limit={CHOICE_QUESTION_SIZE_LIMIT}
                        updateValue={true}
                    />
                </div>
                <Button 
                    style={{display: 'inline-block'}} 
                    color="info"
                    onClick={(event) => {onDelete(index)}}
                >
                    Delete Choice
                </Button>
            </div>
        );
    }
    if (role === 'member') {
        return (
            <option value={index}>{name}</option>
        );
    }
    return (<div>hiimbad</div>);
}

Choice.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    role: PropTypes.string.isRequired,
};

export default Choice;