/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Row, Col, Container, Button, Form
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

function AddQuestion(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ask Your Question About the ~productName~
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Your Question *</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>What is your nickname *</Form.Label>
                  <Form.Control type="name" placeholder="Example: jackson11!" />
                  <Form.Text className="text-muted">
                    For privacy reasons, do not use your full name or email address
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address *</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    For authentication reasons, you will not be emailed.
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

AddQuestion.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
export default AddQuestion;
