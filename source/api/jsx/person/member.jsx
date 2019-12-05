import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import SubmitModal from '../utility/submitModal'
import Traits from '../traits/traits';

class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [], 
            name: '',
            showModal: false
        };

        this.getAnswer = this.getAnswer.bind(this);
        this.setAnswer = this.setAnswer.bind(this);

        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url, {
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({
                    answers: data.answers,
                    name: data.name,
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

    submit() {
        fetch(this.props.url, {
            method: 'patch',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: this.state.answers }),
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                window.location.href = data.url;
            })
            .catch(error => console.log(error));
            // .then((response) => {
            //     if (!response.ok) throw Error(response.statusText);
            //     if (!response.redirected) {
            //         throw Error("Did not redirect on submission");
            //     }
            //     console.log(response);
            //     window.location.href = response.url;
            // })
            // .catch(error => console.log(error));
    }

    render() { // TODO how to get rid of hardcode?
        return(
            <div>
                <div className='title'>
                    <div>Hello {this.state.name}</div>
                    <div>Please fill out this survey</div>
                    <hr/>
                </div>
                <Traits 
                    role='member'
                    url={this.props.url.concat('traits/')}
                    setAnswer={this.setAnswer}
                    getAnswer={this.getAnswer}
                />
                <div className='submit-button'>
                    <Button onClick={() => { this.setState({ showModal: true })}}>
                        Submit
                    </Button>
                </div>
                <SubmitModal
                    show={this.state.showModal}
                    cancel={() => { this.setState({ showModal: false })}}
                    submit={this.submit}
                    link={'localhost:8000'.concat(this.props.source)}
                />
            </div>
        );
    }
}

Member.propTypes = {
    url: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
};

export default Member;

const member = '/member/'.concat(
    document.getElementById('event_id').textContent, 
    '/',
    document.getElementById('hash').textContent,
    '/',
)
ReactDOM.render(
    <Member
        url={'/api/v1'.concat(member)}
        source={member}
    />, document.getElementById('reactEntry')
);

