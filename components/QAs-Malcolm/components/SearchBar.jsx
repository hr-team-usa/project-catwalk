/* eslint-disable */

import React, { useState } from 'react';
import { Row, Col, Container, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import styles from './SearchBar.module.css';

function SearchBar() {

  // const searchBar = {
  //   width: 400,
  //   sm: '8',
  // }
  // const button = {
  //   className: "btn btn-outline-primary",
  //   height: "calc(1.5em + .75rem + 2px)",
  //   icon: "fas fa-search"
  // }

  //
  /* <Form>
     <Row className="justify-content-md-center">
       <Col sm='12'>
         <Form.Control placeholder="Have a question? Search for answers..." className={styles.searchBar} />
       </Col>
         <Button className={styles.button}>
         </Button>
     </Row>
   </Form>
   */

  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Have a question? Search for answers..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              {/* <Button variant="outline-secondary"><i className="fa fa-search"></i></Button> */}
              <Button className="fa fa-search"></Button>
            </InputGroup.Append>
          </InputGroup>

        </Col>
      </Row>
    </Container>
  );
}

export default SearchBar;

