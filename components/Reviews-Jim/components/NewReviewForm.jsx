import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config';

const NewReviewForm = ({ show, onHide, characteristics }) => {
  const [rating, setRating] = useState(0);
  const [recommended, setRecommended] = useState(false);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const sendReview = () => {
    // post request goes here
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Write Your Review
          <br />
          About the PRODUCT NAME
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          Mandatory fields *
          <Form.Group>
            <Form.Label>Overall rating *</Form.Label>
            <br />
            <Rating
              name="product-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Do you recommend this product? *</Form.Label>
            <Form.Check type="radio" label="Yes" />
            <Form.Check type="radio" label="No" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Characteristics</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>Review summary</Form.Label>
            <Form.Control type="" placeholder="Summary" onChange={(e) => setSummary(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Review body *</Form.Label>
            <Form.Control type="" placeholder="Body" onChange={(e) => setBody(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.File id="" label="Upload your photos" />
          </Form.Group>
          <Form.Group>
            <Form.Label>What is your nickname?</Form.Label>
            <Form.Control type="" placeholder="Nickname" onChange={(e) => setNickname(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Your email</Form.Label>
            <Form.Control type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button>Submit Review</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

  );
};

NewReviewForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  characteristics: PropTypes.arrayOf(PropTypes.string),
};

NewReviewForm.defaultProps = {
  characteristics: PropTypes.arrayOf(PropTypes.string),
};

export default NewReviewForm;

// https://react-bootstrap.github.io/components/modal/
// https://react-bootstrap.github.io/components/buttons/
// https://react-bootstrap.github.io/components/forms/
// https://react-bootstrap.github.io/components/input-group/

/*

      <>Overall rating*</>
      <>Do you recommend this product?*</>
      <>Characteristics*</>
      <>Review summary</>
      <>Review body*</>
      <>Upload your photos</>
      <>What is your nickname</>
      <>Your email</>

*/
