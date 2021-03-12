import React from 'react';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

function ImageModal({ show, onHide, image }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Image
          src={image}
          width="100%"
          height="100%"
        />

      </Modal.Header>
    </Modal>
  );
}

export default ImageModal;
