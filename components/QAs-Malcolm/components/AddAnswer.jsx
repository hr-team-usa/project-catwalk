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
  const [imgContainer, setImgContainer] = useState('');
  const [photosToggle, setPhotosToggle] = useState(false);

  const addPhoto = (e) => {
    e.preventDefault();
    if (imgContainer.length) {
      const photosArray = photos;
      photosArray.push(imgContainer);
      setPhotos(photosArray);
      setPhotosToggle(true);
      setImgContainer('');
    } else {
      alert('Please upload a valid image url');
    }
  };

  const removePhoto = (e, photo) => {
    e.preventDefault();
    const photosArray = photos;
    photosArray.splice(photosArray.indexOf(photo), 1);
    setPhotos(photosArray);
    setPhotosToggle(true);
  };

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
      setPhotos([e.target.value]);
    }
  };

  const validationCheck = () => {
    const required = [];
    if (answer === '') {
      required.push('answer');
    }
    if (name === '') {
      required.push('nickname');
    }
    if (email === '') {
      required.push('email address');
    }
    if (required.length) {
      let result = '\n\n';
      for (let i = 0; i < required.length; i += 1) {
        result += `${required[i]}\n`;
      }
      return result;
    }
    return null;
  };

  const submitA = (e) => {
    e.preventDefault();
    if (!validationCheck()) {
      const options = {
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/${props.questionId}/answers`,
        method: 'post',
        headers: {
          Authorization: config.TOKEN,
          'Content-Type': 'application/JSON',
        },
        data: {
          body: answer,
          name,
          email,
          photos,
        },
      };
      axios(options)
        .then(() => { props.onHide(); })
        .then(() => console.log('created in db'))
        .catch((err) => console.log(err));
    } else {
      alert(`Please complete the required fields: ${validationCheck()}`);
    }
  };

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
                  <Form.Label>Your Answer (required)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="formAnswer"
                  />
                  <Form.Text>
                    {answer.length}
                    /1000 max
                  </Form.Text>
                </Form.Group>
                <Form.Group onChange={(e) => { handleChange(e); }} required>
                  <Form.Label>What is your nickname (required)</Form.Label>
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
                  <Form.Label>Email address (required)</Form.Label>
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

                <Form.Group>
                  <Form.Label>Upload your photos</Form.Label>
                  <Form.Control type="" value={imgContainer} placeholder="Paste image url here" onChange={(e) => setImgContainer(e.target.value)} />
                  <Form.Text>
                    {photos.length}
              /5 photos max, click thumbnail to remove
            </Form.Text>
                  {photos.length ? photos.map((photo, i) => <img className="upload-img" key={i} alt="" src={photo} onClick={(e) => removePhoto(e, photo)} />) : null}
                  {(photos.length < 5) ? <Button className="upload-btn" onClick={(e) => addPhoto(e)}>Upload</Button> : null}
                  <style jsx>
                    {`
                img {
                  height: 75px;
                }
            `}
                  </style>
                </Form.Group>
                <br />
                <br />
                <Button variant="primary" type="submit" onClick={(e) => submitA(e)}>
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
