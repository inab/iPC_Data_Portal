import React from 'react';
import { Button, Modal } from "react-bootstrap";
import RequestForm from "../../Form/Request";

const RequestModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={(e) => props.close(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Request Access: {props.dataset}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RequestForm submit={props.submit}
                                 input={props.input}
                                 comments={props.comments}
                                 policy={props.policy} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => props.close(e)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
};

export default RequestModal;
