import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SearchBar from 'material-ui-search-bar';
import PropTypes from 'prop-types';

function QASearchBar({ setSearchedMatch, questions }) {
  const [searchBody, setSearchBody] = useState('');

  const filterQuestions = () => {
    (searchBody.length >= 3 ?
      setSearchedMatch(questions.filter(({ question_body }) => (question_body.toLowerCase()).includes(searchBody)))
      : setSearchedMatch(null));
  };

  useEffect(() => {
    filterQuestions();
  }, [searchBody]);

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
          // onChange={() => setSubmitSearch(true)}
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
