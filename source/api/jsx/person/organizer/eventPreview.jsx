import React from 'react';
import PropTypes from 'prop-types';
import EventName from './eventName'
import { Button } from 'reactstrap';

function EventPreview(props) {
    return (
        <div onClick={() => {window.location.href = props.source;}} className='event-preview'>
            <div className='event-preview-in'>
                <h1>
                    <EventName url={props.url} showEditButton={false} />
                </h1>
            </div>
            <div style={{float: 'right', paddingBottom: '30px', paddingRight: '30px'}}>
                <Button style={{display: 'inline-block'}} onClick={(e) => {e.stopPropagation(); props.onDelete(props.id);}}>
                    Delete
                </Button>
            </div>
        </div>
    );
}

EventPreview.propTypes = {
    url: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default EventPreview;