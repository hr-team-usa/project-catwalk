import React from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddQuestion() {
  return (
    <Container>
      <Row>
        <Col>
          <Button>MORE ANSWERED QUESTIONS</Button>
        </Col>
        <Col>
          <Button>ADD A QUESTION +</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AddQuestion;
