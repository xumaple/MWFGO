import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect } from 'react-router-dom';
import TextBox from './../utility/textBox';

class Intro extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name: '', redirecting: false };

        this.editName = this.editName.bind(this);
        this.submitName = this.submitName.bind(this);
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
                if (response.redirected) {
                    window.location.href = response.url;
                }
            })
            .catch(error => console.log(error));
    }

    render(){
        if (this.state.redirecting) {
            return (<div> Redirecting... </div>);
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