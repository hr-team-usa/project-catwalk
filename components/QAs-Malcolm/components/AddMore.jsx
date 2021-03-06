import React, { useState } from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import AddQuestion from './AddQuestion';

function AddMore() {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <Button>MORE ANSWERED QUESTIONS</Button>
        </Col>
        <Col>
          <Button onClick={() => setShow(true)}>ADD A QUESTION +</Button>
          <AddQuestion variant="primary" show={show} onHide={() => setShow(false)} />
        </Col>
      </Row>
    </Container>
  );
}

export default AddMore;
