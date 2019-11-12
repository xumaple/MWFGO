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
        this.getTraits = this.getTraits.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);

        this.getAnswer = this.getAnswer.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
    }

    getTraits() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    traits: data.traits,
                    answers: Array.apply(null, Array(data.traits.length)),
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getTraits();
    }

    handleDelete(num) {
        // TODO fetch
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
        // this.getTraits();

        // TODO fetch post request
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

    setAnswer(index, context) {
        let newState = this.state.answers.slice(0);
        newState[index] = context;
        this.setState({ answers: newState });
    }

    getAnswer(index) {
        return this.state.answers[index];
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
                            setAnswer={this.setAnswer}
                            getAnswer={this.getAnswer}
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
};

export default Traits;
