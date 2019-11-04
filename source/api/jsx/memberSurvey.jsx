import React from 'react';
import PropTypes from 'prop-types';

class MemberSurvey extends React.Component {
    /*Display organizer's page*/
    
    constructor(props) {
        super(props);
        this.state = {
            traits: [],
        };
        this.handleChangeMin = this.handleChangeMin.bind(this);
        this.handleChangeMax = this.handleChangeMax.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChoice = this.handleChoice.bind(this);  
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
            method: 'POST',
            body: JSON.stringify({ traits: this.state.traits }),
            credentials: 'same-origin',
        };
        fetch(this.props.url, request)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(() => {
                this.getTraits();
            })
            .catch(error => console.log(error));
    }

    handleChoice(event) {
        this.setState({
            choiceId: event.target.id,
        });
    }
    
    render() {
        const traitsList = []
        this.state.traits.map((trait, index) => {
            let question = (
                <div className='time-frame-question'>
                    <form>
                        <input
                         type="text"
                         value={trait.timeFrame['min']}
                         onChange={(e) => this.handleChangeMin(index, e)}
                        />
                    </form>
                    <p>to</p>
                    <form>
                        <input
                         type="text"
                         value={trait.timeFrame['max']}
                         onChange={(e) => this.handleChangeMax(index, e)}
                        />
                    </form>
                </div>
                
            );
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
                );
            };
            traitsList.push(
                <div>
                    <p>{trait.name}</p>
                    {question}
                </div>
            );
        });
        return(
            <div className='member-survey'>
                <p>Please answer the questions below.</p>
                {traitsList}
                <button className='member-submit' onSubmit={this.handleSubmit}>
                    Submit
                </button>
            </div>
            
        );
    }
}

MemberSurvey.propTypes = {
    url: PropTypes.string.isRequired,
};

export default MemberSurvey;
