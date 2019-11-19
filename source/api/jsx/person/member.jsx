import React from 'react';
import PropTypes from 'prop-types';
import Traits from '../traits/traits';

class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [], 
        };

        this.getAnswer = this.getAnswer.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    answers: data.answers,
                });
            })
            .catch(error => console.log(error));
    }

    setAnswer(index, context) {
        let newState = this.state.answers.slice(0);
        newState[index] = context;
        this.setState({ answers: newState });
    }

    getAnswer(index) {
        return this.state.answers[index];
    }

    render() {
        console.log(this.state.answers);
        return(
            <div className='memberSurvey'>
                <p><b>Survey</b></p>
                <Traits 
                    role='member'
                    hash={this.props.hash}
                    url={this.props.url.concat('traits/')}
                    setAnswer={this.setAnswer}
                    getAnswer={this.getAnswer}
                />
            </div>
        );
    }
}

Member.propTypes = {
    url: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
};

export default Member;
