import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
const AddUserForm = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const intialFormState = { id: null, name: '', email: '' }
    const [user, setUser] = useState(intialFormState)
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }
    const onSubmit = (event) => {
        event.preventDefault()
        if (!user.name || !user.email) return
        props.addUser(user)
        setUser(intialFormState)
        setShow(false)
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" >
                <Modal.Header closeButton>
                    <Modal.Title>Add Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Name" onChange={handleInputChange} />

            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phone" type="tel" placeholder="Enter phone" onChange={handleInputChange} />
            </Form.Group>
          </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Add
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AddUserForm