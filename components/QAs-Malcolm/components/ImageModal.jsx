import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

function ImageModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Image
          src={props.img}
          width="100%"
          height="100%"
        />

      </Modal.Header>
    </Modal>
  )
}

export default ImageModal;
