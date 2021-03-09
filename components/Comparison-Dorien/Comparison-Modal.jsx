import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Comparison_Modal = (props) => (
    <Modal.Dialog {...props}>
    <Modal.Header closeButton>
      <Modal.Title>Modal title</Modal.Title>
    </Modal.Header>
  
    <Modal.Body>
      <p>Modal body text goes here.</p>
    </Modal.Body>
  
    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal.Dialog>
)

export default Comparison_Modal;