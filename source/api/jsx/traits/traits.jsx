import React from 'react';
import { Alert, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import Trait from './trait';


class Traits extends React.Component {
    /*Display organizer's page*/
    
    constructor(props) {
        super(props);
        this.state = {
            traits: [],
            editing: -1, // nonnegative for trait index, negative for not editing
            showAlert: false,
            traitCounter: 0,
            answers: [], 
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.edit = this.edit.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    traits: data.traits,
                    traitCounter: data.traits.length > 0 ? data.traits[data.traits.length - 1] : 0
                });
            })
            .catch(error => console.log(error));
    }

    handleDelete(num) {
        this.setState({
            editing: -1, 
            showAlert: false,
        });
    }

    handleSave(num) {
        if (this.state.editing !== num) {
            // Sanity check
            console.log('Saved from bad editing state!');
            return;
        }

        this.setState({editing: -1, showAlert: false, });
    }

    toggleAlert() {
        this.setState({
            showAlert: !this.state.showAlert,
        });
    }

    edit(num) { // -1 for new trait, nonnegative for already existing trait
        let { editing } = this.state;
        if (editing >= 0 && editing !== num) {
            this.setState({ showAlert: true, });
            return;
        }
        if (num === -1) {
            // Create new trait
            num = this.state.traitCounter;
            fetch(this.props.url.concat(num, '/'), {
                method: 'post',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            })
                .then((response) => {
                    if (!response.ok) throw Error(response.statusText);
                    return;
                })
                .catch(error => console.log(error));
            this.setState({ traitCounter: this.state.traitCounter + 1 });
            this.state.traits = this.state.traits.concat(num);
        }
        this.setState({editing: num, showAlert: false, });
    }

    renderMember() {
        if (this.props.role === 'member') {
            return (
                <div>
                    {this.state.traits.map((id) => (
                        <Trait
                            url={this.props.url.concat(id, '/')}
                            role={this.props.role}
                            id={id}
                            setAnswer={(id, answer) => { this.props.setAnswer(this.state.traits.indexOf(id), answer); }}
                            getAnswer={(id) => { return this.props.getAnswer(this.state.traits.indexOf(id)); }}
                            key={id}
                        />
                    ))}
                </div>
            );
        }
        else return '';
    }

    renderLeader() {
        return '';
    }

    renderOrganizer() {
        if (this.props.role === 'organizer') {
            return(
                <div className='traits'>
                    <Alert color="primary" isOpen={this.state.showAlert} toggle={() => {this.setState({ showAlert: false, })}} >
                        Please save or cancel your changes before continuing.
                    </Alert>
                    {this.state.traits.map((id) => (
                        <Trait
                            url={this.props.url.concat(id, '/')}
                            role={this.props.role}
                            id={id}
                            onDelete={this.handleDelete}
                            onSave={this.handleSave}
                            onEdit={this.edit}
                            editing={id - this.state.editing === 0}
                            key={id}
                        />
                    ))}
                    <Button className='new-trait' onClick={(event) => {this.edit(-1)}}>
                        New Trait
                    </Button>
                </div>
            );
        }
        else return '';
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

Traits.propTypes = {
    url: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    getAnswer: PropTypes.func,
    setAnswer: PropTypes.func,
};

export default Traits;
