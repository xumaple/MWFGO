import React from 'react';
import PropTypes from 'prop-types';

class MemberSurvey extends React.Component {
    /*Display organizer's page*/
    
    constructor(props) {
        super(props);
        state = {
            traits: [],

        };

        this.handleDelete = this.handleDelete.bind(this);      
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

    handleChange(trait, event) {
        
    }
    
    render() {
        const traitsList = this.state.traits.map(trait => {
            let question = (
                <form>
                    <input
                     type="text"
                     value={this.state.timeFrame['min']}
                     onChange={(e) => this.handleChange(trait, e)}
                    />
                </form>
            )
            if(trait.type === 1) {

            }
            return [
                <p>trait.name</p>,
                
            ]
        });
        return(
            <div className='member-survey'>
                <p>Please answer the questions below.</p>

            </div>
            
        );
    }
}

MemberSurvey.propTypes = {
    url: PropTypes.string.isRequired,
};

export default MemberSurvey;
