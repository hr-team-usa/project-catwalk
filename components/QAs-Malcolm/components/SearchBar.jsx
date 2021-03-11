import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SearchBar from 'material-ui-search-bar';
import PropTypes from 'prop-types';

function QASearchBar({ setSearchedMatch, questions }) {
  const [searchBody, setSearchBody] = useState('');

  const filterQuestions = () => {
    // eslint-disable-next-line no-unused-expressions
    searchBody.length >= 3
      // eslint-disable-next-line max-len
      ? setSearchedMatch(questions.filter(({ question_body }) => (question_body.toLowerCase()).includes(searchBody)))
      : setSearchedMatch(null);
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
  setSearchedMatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    answers: PropTypes.shape({
      answerer_name: PropTypes.string,
      body: PropTypes.string,
      date: PropTypes.string,
      helpfulness: PropTypes.number,
      id: PropTypes.number,
      photos: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
      })),
    }),
    asker_name: PropTypes.string,
    question_id: PropTypes.number,
    question_body: PropTypes.string,
    question_date: PropTypes.string,
    question_helpfulness: PropTypes.number,
  })).isRequired,
};

export default QASearchBar;
