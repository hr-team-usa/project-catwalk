import React, { useState } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
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
  )

}

export default AddQuestion;
