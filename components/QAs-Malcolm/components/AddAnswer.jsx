/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Row, Col, Container, Button, Form,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import PropTypes from 'prop-types';
import config from '../../../config';

function AddAnswer(props) {
  const [answer, setAnswer] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === 'formAnswer') {
      setAnswer(e.target.value);
    }
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'photo') {
      setPhotos(e.target.value);
    }
  };

  const submitQ = () => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/${props.questionId}/answers`,
      method: 'post',
      headers: {
        Authorization: config.TOKEN,
      },
      data: {
        body: answer,
        name,
        email,
        photos: [],
      },
    };

    axios(options)
      .then(() => { props.onHide(); })
      .then(() => console.log('created in db'))
      .catch((err) => console.log(err));
  };

  // const handleAddPhoto = (e) => {
  //   console.log(e.target.parentNode.input);
  //   // const file = e.target.files[0];
  //   const reader = new FileReader();
  //   const url = reader.readAsDataURL(file.name);
  // };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Submit Your Answer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group
                  controlId="exampleForm.ControlTextarea1"
                  variant="error"
                  maxLength={1000}
                  onChange={(e) => { handleChange(e); }}
                  required
                >
                  <Form.Label>Your Answer *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="formAnswer"
                  />
                </Form.Group>
                <Form.Group onChange={(e) => { handleChange(e); }} required>
                  <Form.Label>What is your nickname *</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Example: jack543!"
                    maxLength={60}
                    name="name"
                  />
                  <Form.Text className="text-muted">
                    For privacy reasons, do not use your full name or email address
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  controlId="formBasicEmail"
                  onChange={(e) => { handleChange(e); }}
                  required
                >
                  <Form.Label>Email address *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Example: jack@email.com"
                    maxLength={60}
                    name="email"
                  />
                  <Form.Text className="text-muted">
                    For authentication reasons, you will not be emailed.
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  controlId="addPhoto"
                  onChange={(e) => { handleChange(e); }}
                  required
                >
                  <Form.Label>Add Photos</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Photo URL"
                    maxLength={1000}
                    name="photo"
                  />
                  <Form.Text className="text-muted">
                    Please copy and past full photo URL
                  </Form.Text>
                </Form.Group>
                <br />
                <br />
                <Button variant="primary" type="submit" onClick={() => submitQ()}>
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

AddAnswer.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  productId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  questionId: PropTypes.number.isRequired,
};
export default AddAnswer;
