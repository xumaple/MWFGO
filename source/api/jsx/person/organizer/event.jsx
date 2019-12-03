import React from 'react';
import Traits from '../../traits/traits';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import TextBox from '../../utility/textBox'
import SubmitModal from '../../utility/submitModal'

// import Limiters from '../limiters/limiters';

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            showModal: false,
            editingName: false,
            name: '',
        };
        this.openForms = this.openForms.bind(this);
        this.getName = this.getName.bind(this);
        this.saveName = this.saveName.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then((data) => {
                if (data.name !== this.state.name) {
                    this.setState({name: data.name});
                }
            })
            .catch(error => console.log(error));
    }

    openForms() {
        console.log('submitting', this.props.url);
        fetch(this.props.url.concat('submit/'), { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                if (!response.redirected) {
                    throw Error("Did not redirect on submission");
                }
                console.log(response);
                window.location.href = response.url;
            })
            .catch(error => console.log(error));
    }

    getName() {
        return this.state.name !== '' ? this.state.name : 'Event Name'
    }

    saveName() {
        fetch(this.props.url, {
            method: 'patch',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': this.state.name,
            }),
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return;
            })
            .then(() => {
                this.setState({ editingName: false });
            })
            .catch(error => console.log(error));
    }

    render(){
        if (this.props.preview !== undefined) {
            // Preview view of this event
            return (
                <div className='event-preview'>
                    <div className='event-preview-in'>
                        {this.getName()}
                    </div>
                    <div style={{float: 'right', padding: '30px'}}>
                        <Button style={{display: 'inline-block'}} onClick={() => {window.location.href = this.props.source;}}>
                            Edit
                        </Button>
                        <Button style={{display: 'inline-block'}} onClick={(event) => {this.props.preview.onDelete(this.props.preview.id)}}>
                            Delete
                        </Button>
                    </div>
                </div>
            );
        }
        return(
            <div>
                {this.state.editingName ? 
                    <div>
                        <div style={{display: 'inline-block', width: '90%'}} ><TextBox 
                            defaultValue='Event Name'
                            value={this.state.name}
                            editValue={(newName) => { this.setState({ name: newName }); }}
                            style={{fontSize:'30px'}}
                            limit={50}
                            onSubmit={this.saveName}
                        /></div><Button style={{display: 'inline-block'}} onClick={this.saveName}>
                            Save
                        </Button>
                    </div>
                    : <div className='title'>
                        <a onClick={() => { this.setState({ editingName: true })}}>{this.getName()}</a>
                        
                        <div className='edit'>
                            <a onClick={() => { this.setState({ editingName: true })}}>edit</a>
                        </div>
                    </div>
                }
                <hr/>
                <div><Traits url={this.props.url.concat('traits/')} role='organizer' /></div>
                {/*<p><b>Limiters</b></p>
                <div><Limiters url={`${this.props.url}limiters/`} /></div>*/}
                <div className='submit-button'>
                    <Button color='primary' onClick={() => { this.setState({ showModal: true })}}>
                        Open up forms!
                    </Button>
                </div>
                <Button onClick={() => {window.location.href = this.props.source.substring(0, this.props.source.search('/events/'))}} >
                    Back
                </Button>
                <SubmitModal
                    show={this.state.showModal}
                    cancel={() => { this.setState({ showModal: false })}}
                    submit={this.openForms}
                    link={this.props.source}
                />
            </div>
        );
    }
}

Event.propTypes = {
    url: PropTypes.string.isRequired,
    source: PropTypes.string,
    preview: PropTypes.shape({
        id: PropTypes.number.isRequired,
        onDelete: PropTypes.func.isRequired,
    }),
};

export default Event;