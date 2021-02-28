/* eslint-disable */

import React, { useState } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar() {

  const searchBar = {
    width: 400,
    sm: '8',
  }
  const button = {
    className: "btn btn-outline-primary",
    height: "calc(1.5em + .75rem + 2px)",
    icon: "fas fa-search"
  }

  return (
    <Container>
      <Form>
        <Row className="justify-content-md-center">
          <Col sm='8'>
            <Form.Control placeholder="Have a question? Search for answers..." style={searchBar} />
          </Col>
          <Col sm='4'>
            <Button style={button}>
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default SearchBar;

// <input className="col-md" placeholder="Have a question? Search for answers..."></input>
// <button>Search</button>
/*
<Container>
      <Form>
        <Row >
          <Col md="auto">
          <Form.Control placeholder="Have a question? Search for answers..."/>
          </Col>
        </Row>
      </Form>
    </Container>
    */