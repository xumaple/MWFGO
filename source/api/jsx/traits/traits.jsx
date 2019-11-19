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
            saveAlert: false,
            traitCounter: 0,
            errorAlert: false, 
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
                const newCounter = data.traits.length > 0 ? data.traits[data.traits.length - 1] + 1 : 0;
                console.log(newCounter);
                this.setState({
                    traits: data.traits,
                    traitCounter: newCounter
                });
            })
            .catch(error => console.log(error));
    }

    handleDelete(num) {
        this.setState({
            editing: -1, 
            saveAlert: false,
        });
    }

    handleSave(num) {
        if (this.state.editing !== num) {
            // Sanity check
            console.log('Saved from bad editing state!');
            return;
        }

        this.setState({editing: -1, saveAlert: false, });
    }

    toggleAlert() {
        this.setState({
            saveAlert: !this.state.saveAlert,
        });
    }

    edit(num) { // -1 for new trait, nonnegative for already existing trait
        let { editing } = this.state;
        if (editing >= 0 && editing !== num) {
            this.setState({ saveAlert: true, });
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
                .then(() => {
                    this.setState({ 
                        traitCounter: this.state.traitCounter + 1, 
                        errorAlert: false, 
                        traits: this.state.traits.concat(num),
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ errorAlert: true })
                });
        }
        this.setState({editing: num, saveAlert: false, });
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
                <div>
                    <Alert color="primary" isOpen={this.state.saveAlert} toggle={() => {this.setState({ saveAlert: false, })}} >
                        Please save or cancel your changes before continuing.
                    </Alert>
                    {this.state.traits.map((id) => (
                        <div className="trait" >
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
                        </div>
                    ))}
                    <Alert color="primary" isOpen={this.state.errorAlert} toggle={() => {this.setState({ errorAlert: false, })}} >
                        Error. Could not reach server.
                    </Alert>
                    <Button onClick={(event) => {this.edit(-1)}}>
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
