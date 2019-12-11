import React from 'react';
import PropTypes from 'prop-types';
import Trait from '../../traits/trait';
import { Table } from 'reactstrap';

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            traits: [],
        };

        this.getResults = this.getResults.bind(this);
    }

    componentDidMount() {
        this.getResults();
    }



    getResults() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({ 
                    members: data.members,
                    traits: data.traits,
                });
            })
            .catch(error => console.log(error));
    }

    render(){
        return(
            <div>
                <Table striped >
                    <thead>
                        <tr>
                            <th>Name</th>
                            {this.state.traits.map((c) => (<ResultLabel key={c} url={this.props.url.concat('label/', c, '/')} />))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.members.map((m) => (<ResultResponse url={this.props.url.concat(m, '/')} traits={this.state.traits} />))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

Results.propTypes = {
    url: PropTypes.string.isRequired,
};

class ResultLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { label: '' };
        this.getLabel = this.getLabel.bind(this);
    }

    componentDidMount() {
        this.getLabel();
    }

    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
            this.getLabel();
        }
    }

    getLabel() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({ label: data.label });
            })
            .catch(error => console.log(error));
    }

    render(){
        return(
            <th>{this.state.label}</th>
        );
    }
}

ResultLabel.propTypes = {
    url: PropTypes.string.isRequired,
}

class ResultResponse extends React.Component {
    constructor(props) {
        super(props);
        this.state = { answers: [], name: '', link: null };
        this.getResponse = this.getResponse.bind(this);
        this.getAnswer = this.getAnswer.bind(this);
    }

    componentDidMount() {
        this.getResponse();
    }

    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
            this.getResponse();
        }
    }

    getResponse() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({ answers: data.answers, name: data.name, link: data.link });
            })
            .catch(error => console.log(error));
    }

    getAnswer(index) {
        return this.state.answers[index];
    }

    render() {

        return(
            <tr>
                <th scope="row" ><a style={{color: '#000000'}} href={this.state.link}>{this.state.name}</a></th>
                {this.props.traits.map((traitId, index) => (
                    <Trait
                        role='result'
                        id={index}
                        url={this.props.url.concat(traitId, '/')}
                        getAnswer={this.getAnswer}
                    />
                ))}
            </tr>
        );
    }
}

ResultResponse.propTypes = {
    url: PropTypes.string.isRequired,
    traits: PropTypes.array.isRequired,
}

export default Results;