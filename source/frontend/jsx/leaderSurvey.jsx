import React from 'react';
import PropTypes from 'prop-types';

class LeaderSurvey extends React.Component {
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

    handleChangeMin(index, e) {
        const tmp = this.state.traits;
        tmp[index].timeFrame.min = e.target.value;
        this.setState({
            traits: tmp,
        });
    }

    handleChangeMax(index, e) {
        const tmp = this.state.traits;
        tmp[index].timeFrame.max = e.target.value;
        this.setState({
            traits: tmp,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const request = {
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            body: JSON.stringify({ traits: this.state.traits }),
            credentials: 'same-origin',
        };
        fetch(this.props.url, request)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .catch(error => console.log(error));
    }
    
    render() {
        const traitsList = this.state.traits.map((trait, index) => {
            let question = (
                <div className='time-frame-question'>
                    <form>
                        <input
                         type="text"
                         value={trait.timeFrame.min}
                         onChange={(e) => this.handleChangeMin(index, e)}
                        />
                    </form>
                    <p>to</p>
                    <form>
                        <input
                         type="text"
                         value={trait.timeFrame.max}
                         onChange={(e) => this.handleChangeMax(index, e)}
                        />
                    </form>
                </div>
                
            )
            if(trait.type === 1) {
                const optionsList = trait.choices.map(choice => (
                    <input
                     type='radio'
                     id={choice.id}
                     onChange={this.handleChoice}>
                     {choice.name}
                    </input>   
                ));
                question = (
                    <div className='MC-question'>
                        <form>
                            {optionsList}
                        </form>
                    </div>
                )
            }
            return [
                <p>trait.name</p>,
                {question}
            ]
        });
        return(
            <div className='leader-survey'>
                <p>Please answer the questions below.</p>
                {traitsList}
                <button className='leader-submit' onSubmit={this.handleSubmit}>
                    Submit
                </button>
            </div>
            
        );
    }
}

LeaderSurvey.propTypes = {
    url: PropTypes.string.isRequired,
};

export default LeaderSurvey;
