/* eslint-disable */

import React, { useState } from 'react';
import { Row, Col, Container, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import styles from './SearchBar.module.css';
import SearchBar from 'material-ui-search-bar';

function QASearchBar() {

  return (
    <Container>
      <Row>
        <Col>
          <SearchBar placeholder="Have a question? Search for answers..."/>
          <></><br></br>
        </Col>
      </Row>
    </Container>
  )
};

export default QASearchBar;


  //   <Container>
  //     <Row>
  //       <Col>
  //         <InputGroup className="mb-3">
  //           <FormControl
  //             placeholder="Have a question? Search for answers..."
  //             aria-label="Recipient's username"
  //             aria-describedby="basic-addon2"
  //           />
  //           <InputGroup.Append>
  //             {/* <Button variant="outline-secondary"><i className="fa fa-search"></i></Button> */}
  //             <Button className="fa fa-search"></Button>
  //           </InputGroup.Append>
  //         </InputGroup>

  //       </Col>
  //     </Row>
  //   </Container>
  // );