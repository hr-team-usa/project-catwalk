import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SearchBar from 'material-ui-search-bar';
// import styles from './SearchBar.module.css';

function QASearchBar() {
  return (
    <Container>
      QUESTIONS & ANSWERS
      <Row>
        <Col>
          <br />
          <SearchBar placeholder="Have a question? Search for answers..."/>
          <></>
          <br />
        </Col>
      </Row>
    </Container>
  );
}

export default QASearchBar;
