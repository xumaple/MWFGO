import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect } from 'react-router-dom';
import TextBox from './../utility/textBox';

class Intro extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name: '', formOpen: false };

        this.editName = this.editName.bind(this);
        this.submitName = this.submitName.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then((data) => {
                console.log('found', data.open);
                this.setState({ formOpen: data.open });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ formOpen: false });
            });
    }

    editName(newName) {
        this.setState({ name: newName });
    }

    submitName() {
        console.log(this.state.name);
        fetch(this.props.url, {
            method: 'post',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name
            }),
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                if (!response.redirected) {
                    throw Error("Did not redirect on submission");
                }
                window.location.href = response.url;
            })
            .catch(error => console.log(error));
    }

    render(){
        console.log(this.state.formOpen);
        if (!this.state.formOpen) {
            return (<div> Sorry! This form is not yet available. </div>);
        }
        return(
            <Container>
                What is your name? 
                <TextBox 
                    defaultValue={''}
                    value={this.state.name}
                    editValue={this.editName}
                    limit={50}
                    onSubmit={this.submitName}
                />
            </Container>        
        );
    }
}

Intro.propTypes = {
    url: PropTypes.string.isRequired,
}

export default Intro;