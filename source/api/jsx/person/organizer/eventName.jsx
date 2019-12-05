import React from 'react';
import PropTypes from 'prop-types';
import EditableText from '../../utility/editableText'


class EventName extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name: '' };

        this.saveName = this.saveName.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then((data) => {
                if (data.name !== this.state.name) {
                    this.setState({name: data.name});
                }
            })
            .catch(error => console.log(error));
    }

    saveName(newValue) {
        fetch(this.props.url, {
            method: 'patch',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': newValue,
            }),
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return;
            })
            .then(() => {
                this.setState({ name: newValue });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <EditableText 
                value={this.state.name}
                defaultValue='Event Name'
                save={this.saveName}
                showEditButton={this.props.showEditButton}
            />
        );
    }
}

EventName.propTypes = {
    url: PropTypes.string.isRequired,
    showEditButton: PropTypes.bool.isRequired,
};

export default EventName;