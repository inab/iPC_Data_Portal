import React from 'react';
import { Button, Modal } from "react-bootstrap";
import RequestForm from "../../Form/Request";

const RequestModal = (props) => {

    const {
        comments, 
        close,
        dataset,
        input,
        show, 
        submit,  
        policy } = props;

    return (
        <>
            <Modal show={show} onHide={(e) => close(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Request Access: {dataset}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RequestForm submit={submit}
                                 input={input}
                                 comments={comments}
                                 policy={policy} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => close(e)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
};

export default RequestModal;
