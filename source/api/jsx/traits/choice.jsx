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
            <div className='choice'>
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
                    color="info" className='delete' 
                    onClick={(event) => {onDelete(index)}}
                >
                    Delete Choice
                </Button>
            </div>
        );
    }
    return (<div>hiimbad</div>);
}

Choice.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired,
};

export default Choice;