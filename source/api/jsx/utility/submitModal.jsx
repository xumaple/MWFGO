import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class SubmitModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { copied: false }

        this.copyLink = this.copyLink.bind(this);
    }

    copyLink() {
        this.state = {}
    }

    render() {
        return (
            <Modal isOpen={this.props.show}>
                <ModalHeader>Continue?</ModalHeader>
                <ModalBody>
                    <div>Are you sure you want to continue? If you would like to revisit this survey or change your answers, please save the following link:</div>
                    <div>{this.props.link}</div>
                    <CopyToClipboard text={this.props.link} onCopy={() => {this.setState({ copied: true });}}>
                        <Button>Copy link</Button>
                    </CopyToClipboard> {this.state.copied ? <span style={{color: 'blue'}}>Copied!</span> : ''}

                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.cancel}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={this.props.submit}>
                        Confirm
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

SubmitModal.propTypes = {
    show: PropTypes.bool.isRequired,
    cancel: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    link: PropTypes.string.isRequired,
};

export default SubmitModal;