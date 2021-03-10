import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SearchBar from 'material-ui-search-bar';
import PropTypes from 'prop-types';

function QASearchBar({ setSearchBody, setSubmitSearch }) {
  return (
    <Container>
      QUESTIONS & ANSWERS
      <Row>
        <Col>
          <br />
          <SearchBar
            placeholder="Have a question? Search for answers..."
            onChange={(value) => setSearchBody(value)}
            name="searchBar"
            onRequestSearch={() => setSubmitSearch(true)}
          />
          <></>
          <br />
        </Col>
      </Row>
    </Container>
  );
}

QASearchBar.propTypes = {
  setSearchBody: PropTypes.func,
};

QASearchBar.defaultProps = {
  setSearchBody: null,
};

export default QASearchBar;
