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
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.edit = this.edit.bind(this);
        this.getTraits = this.getTraits.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
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
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getTraits();
    }

    handleDelete(num) {
        // this.getTraits();

        // TODO fetch
        this.setState({
            editing: -1, 
            showAlert: false,
        });
    }

    handleSave(num) {
        if (this.state.editing !== num) {
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
            num = this.state.traits.length;
            this.state.traits = this.state.traits.concat(<Trait
                url={this.props.url.concat('1000000000/')}
                id={num}
                onDelete={this.handleDelete}
                onSave={this.handleSave}
                onEdit={this.edit}
                editing={true}
            />);
        }
        this.setState({editing: num, showAlert: false, });
    }
    
    render() {
        return(
            <div className='traits'>
                <Alert color="primary" isOpen={this.state.showAlert} toggle={() => {this.setState({ showAlert: false, })}} >
                    Please save your changes before continuing.
                </Alert>
                {this.state.traits.map((trait, index) => (
                    <Trait
                     url={this.props.url.concat(index, '/')}
                     id={index}
                     onDelete={this.handleDelete}
                     onSave={this.handleSave}
                     onEdit={this.edit}
                     editing={index - this.state.editing === 0}
                    />
                ))}
                <Button className='new-trait' onClick={(event) => {this.edit(-1)}}>
                    New Trait
                </Button>
            </div>
            
        );
    }
}

Traits.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Traits;
