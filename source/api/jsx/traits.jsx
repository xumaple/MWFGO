import React from 'react';
import PropTypes from 'prop-types';
import Trait from './trait';


class Traits extends React.Component {
    /*Display organizer's page*/
    
    constructor(props) {
        super(props);
        this.state = {
            traits: [],
            value: '',
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTraits = this.getTraits.bind(this);
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

    handleDelete() {
        event.preventDefault();
        this.getTraits();
    }

    handleSave() {
        this.getTraits();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    
    render() {

        return(
            <div className='traits'>
                {this.state.traits.map(trait => (
                    <Trait
                     url={`${this.props.url}${trait.id}/`}
                     onDelete={this.handleDelete}
                     onSave={this.handleSave}
                    />
                ))}
                <p>Add a new Trait below</p>
                <form id="new-trait-form">
                    <Trait
                     url={`${this.props.url}1000000000/`}
                     onDelete={this.handleDelete}
                     onSave={this.handleSave}
                    />
                </form>
            </div>
            
        );
    }
}

Traits.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Traits;
