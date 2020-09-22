import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, ModalBody } from 'react-bootstrap'

function Delete(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState(props.user)

  useEffect(() => {
    setUser(props.user)
  }, [props])
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <ModalBody>
          Are You sure?
        </ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(event) => {
            event.preventDefault()
            props.deleteUser(user.id)
            setShow(false)
          }}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
function Example(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState(props.user)
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
    console.log(user);
  }
  useEffect(() => {
    setUser(props.user)
  }, [props])
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Name" defaultValue={user.name} onChange={handleInputChange} />

            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" defaultValue={user.email} onChange={handleInputChange} />
              {/* <input name="name"></input> */}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phone" type="tel" placeholder="Enter phone" defaultValue={user.phone} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(event) => {
            event.preventDefault()
            props.updateUser(user.id, user)
            setShow(false)
          }}>Edit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const UserTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map((user) => (
          <tr key={user.id}>

            <td>
              {user.name}
            </td>
            <td>
              {user.email}
            </td>
            <td>
              {user.phone}
            </td>
            <td>
              <Example user={user} updateUser={props.updateUser} />
              <Delete user={user} updateUser={props.updateUser} deleteUser={props.deleteUser} />
            </td>
          </tr>
        ))
      ) : (
          <tr>
            <td colSpan={3}>No users</td>
          </tr>
        )
      }
    </tbody>
  </table>
)

export default UserTable