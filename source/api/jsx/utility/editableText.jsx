import React from 'react';
import PropTypes from 'prop-types';
import TextBox from './textBox'
import { Button } from 'reactstrap';

class EditableText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: null,
            editingValue: false,
        };
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
    }

    edit(e) {
        e.stopPropagation();
        this.setState({ editingValue: true });
    }

    save() {
        this.setState({ editingValue: false });
        if (this.state.value !== null) {
            this.props.save(this.state.value);
        }
    }

    render() {
        return this.state.editingValue ? (
            <div onClick={(e) => {e.stopPropagation();}}>
                <div style={{display: 'inline-block', width: '90%'}} ><TextBox 
                    defaultValue='Event Name'
                    value={this.props.value}
                    editValue={(newValue) => { this.setState({ value: newValue }); }}
                    style={{fontSize:'30px'}}
                    limit={50}
                    onSubmit={this.save}
                /></div><Button style={{display: 'inline-block'}} onClick={this.save}>
                    Save
                </Button>
            </div>
        ) : (
            <div>
                <a style={{cursor: 'pointer'}} onClick={this.edit}>
                    {this.props.value === '' ? this.props.defaultValue : this.props.value}
                </a>
                {this.props.showEditButton ? 
                    <div className='edit'>
                        <a style={{cursor: 'pointer'}} onClick={this.edit}>edit</a>
                    </div> : ''}
            </div>
        );
    }
}

EditableText.propTypes = {
    value: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    save: PropTypes.func.isRequired,
    showEditButton: PropTypes.bool.isRequired,
};

export default EditableText;