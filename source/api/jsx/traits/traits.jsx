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
            errorAlert: false, 
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.edit = this.edit.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    componentDidMount() {
        console.log(this.props.url);
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    traits: data.traits,
                });
            })
            .catch(error => console.log(error));
    }

    handleDelete(num) {
        const index = this.state.traits.indexOf(num);
        if (index < 0) {
            return;
        }
        let newTraits = this.state.traits.slice(0);
        newTraits.splice(index, 1);
        this.setState({
            traits: newTraits,
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
            fetch(this.props.url, {
                method: 'post',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            })
                .then((response) => {
                    console.log(response);
                    if (!response.ok) throw Error(response.statusText);
                    return response.json()
                })
                .then((data) => {
                    this.setState({  
                        errorAlert: false, 
                        saveAlert: false,
                        editing: data.id,
                        traits: this.state.traits.concat(data.id),
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ errorAlert: true })
                });
        }
        else {
            this.setState({editing: num, saveAlert: false, });
        }
    }

    renderMember() {
        if (this.props.role === 'member') {
            return (
                <div>
                    {this.state.traits.map((id) => (
                        <div className = "trait">
                            <Trait
                                url={this.props.url.concat(id, '/')}
                                role={this.props.role}
                                id={id}
                                setAnswer={(id, answer) => { this.props.setAnswer(this.state.traits.indexOf(id), answer); }}
                                getAnswer={(id) => { return this.props.getAnswer(this.state.traits.indexOf(id)); }}
                                key={id}
                            />
                        </div>
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
                        <div className="trait">
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
                    <div className="trait">
                        <div className ="trait-in"><Button onClick={(event) => {this.edit(-1)}}>
                            New Trait
                        </Button></div>
                    </div>
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
