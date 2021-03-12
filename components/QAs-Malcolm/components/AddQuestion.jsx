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

function AddQuestion(props) {
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'formQuestion') {
      setQuestion(e.target.value);
    }
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  const validationCheck = () => {
    const required = [];
    if (question === '') {
      required.push('question');
    }
    if (name === '') {
      required.push('nickname');
    }
    if (email === '') {
      required.push('email address');
    }
    if (required.length) {
      let result = '\n';
      for (let i = 0; i < required.length; i += 1) {
        result += `${required[i]}\n`;
      }
      return result;
    }
    return null;
  };

  const submitQ = (e) => {
    console.log(typeof props.productId)
    e.preventDefault();
    if (!validationCheck()) {
      const options = {
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions',
        method: 'post',
        headers: {
          Authorization: config.TOKEN,
        },
        data: {
          body: question,
          name,
          email,
          product_id: props.productId,
        },
      };

      axios(options)
        .then(() => { props.onHide(); })
        .catch((err) => console.log(err));
    } else {
      alert(`Please complete the required fields: ${validationCheck()}`);
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ask Your Question About the
          {' '}
          {props.productName}
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
                >
                  <Form.Label>Your Question *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="formQuestion"
                  />
                  <Form.Text>
                    {question.length}
                    /1000 max
                  </Form.Text>
                </Form.Group>
                <Form.Group onChange={(e) => { handleChange(e); }}>
                  <Form.Label>What is your nickname *</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Example: jackson11!"
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
                >
                  <Form.Label>Email address *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    maxLength={60}
                    name="email"
                  />
                  <Form.Text className="text-muted">
                    For authentication reasons, you will not be emailed.
                  </Form.Text>
                </Form.Group>
                <Button className="submitQBtn" variant="primary" type="submit" onClick={(e) => submitQ(e)}>
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
  productId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  productName: PropTypes.string.isRequired,
};
export default AddQuestion;
