import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

const Comparison_Modal = () => (

  <Modal.Dialog
    show="true"
    style={{
      margin: 0,
    }}
  >
    <Modal.Header closeButton>
      <Modal.Title>Comparing</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            Product Overview
          </Col>
          <Col xs={6} md={4}>
            Comparison
          </Col>
          <Col xs={6} md={4}>
            Related Product
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={4}>
            .col-xs-6 .col-md-4
          </Col>
          <Col xs={6} md={4}>
            .col-xs-6 .col-md-4
          </Col>
          <Col xs={6} md={4}>
            .col-xs-6 .col-md-4
          </Col>
        </Row>
      </Container>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal.Dialog>
);

export default Comparison_Modal;
