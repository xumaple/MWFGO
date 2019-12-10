import React from 'react';
import PropTypes from 'prop-types';
import EventName from './eventName'
import { Button } from 'reactstrap';

class EventPreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name, stage: '', }

        this.stageUrl = this.stageUrl.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                this.setState({ stage: data.stage })
            })
            .catch((error) => { console.log(error); })
    }

    stageUrl(url) {
        return url.concat(this.state.stage, '/');
    }

    render() {
        console.log('render', this.stageUrl(this.props.source));
        return (
            <div onClick={() => {window.location.href = this.stageUrl(this.props.source);}} className='event-preview'>
                <div className='event-preview-in'>
                    <h1>
                        <EventName url={this.props.url} showEditButton={false} />
                    </h1>
                </div>
                {this.state.stage}
                <div style={{float: 'right', paddingBottom: '30px', paddingRight: '30px'}}>
                    <Button style={{display: 'inline-block'}} onClick={(e) => {e.stopPropagation(); this.props.onDelete(this.props.id);}}>
                        Delete
                    </Button>
                </div>
            </div>
        );
    }
}

EventPreview.propTypes = {
    url: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default EventPreview;