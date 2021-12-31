import React from 'react';
import { Button, Form } from "react-bootstrap";

const RequestForm = (props) => {
    return (
        <>
            <Form onSubmit={(e) => props.submit(e)}>
                <Form.Group>
                    <Form.Label>Describe your request</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Comments...  *"
                        name="comments"
                        value={props.comments}
                        onChange={(e) => props.input(e)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Attached policies from DAC</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Policy *"
                        name="policy"
                        value={props.policy}
                        disabled
                    />
                </Form.Group>
                <Button variant="success" type="submit" block>
                    Send request
                </Button>
            </Form>
        </>)
};

export default RequestForm;
