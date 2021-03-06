import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const NewReviewForm = ({ show, onHide }) => (
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
      <>Overall rating*</>
      <>Do you recommend this product?*</>
      <>Characteristics*</>
      <>Review summary</>
      <>Review body*</>
      <>Upload your photos</>
      <>What is your nickname</>
      <>Your email</>
    </Modal.Body>
    <Modal.Footer>
      <Button>Submit Review</Button>
      <Button onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

NewReviewForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default NewReviewForm;

// https://react-bootstrap.github.io/components/modal/
// https://react-bootstrap.github.io/components/buttons/
// https://react-bootstrap.github.io/components/forms/
// https://react-bootstrap.github.io/components/input-group/
