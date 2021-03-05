/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config';

function Q(props) {
  const [oneAnswer, setOneAnswer] = useState({});
  const [twoAnswer, setTwoAnswer] = useState({});

  const parseAnswers = () => {
    let one = Object.keys(props.answers).slice(0, 1);
    let two = Object.keys(props.answers).slice(1, 2);
    const all = Object.keys(props.answers);
    const helpfulness = [];

    for (let j = 0; j < all.length; j += 1) {
      helpfulness.push(props.answers[all[j]].helpfulness);
    }

    helpfulness.sort((a, b) => b - a);
    for (let k = 0; k < all.length; k += 1) {
      if (props.answers[all[k]].helpfulness === helpfulness[0]) {
        one = all[k];
      }
      if (props.answers[all[k]].helpfulness === helpfulness[1]) {
        two = all[k];
      }
    }

    for (let i = 0; i < all.length; i += 1) {
      if (props.answers[all[i]].answerer_name === 'Seller') {
        setOneAnswer(props.answers[all[i]]);
        setTwoAnswer(props.question.answers[one]);
        return;
      }
    }
    setOneAnswer(props.question.answers[one]);
    setTwoAnswer(props.question.answers[two]);
  };

  useEffect(() => {
    parseAnswers();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    let qaPath = 'answers';
    if (e.target.parentNode.id.length === 6) {
      qaPath = 'questions';
    } else {
      qaPath = 'answers';
    }
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/${qaPath}/${e.target.parentNode.id}/helpful`,
      method: 'put',
      headers: {
        Authorization: config.TOKEN,
      },
    };
    //GET /qa/questions/:question_id/answers
    axios(options)
      .then(() => props.setRender(true))
      .catch((err) => console.log(err));
  };

  const formatDate = (stringDate) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(stringDate).toLocaleDateString(undefined, options);
  };
  const answerStyle = {
    borderRight: '1px solid #ccc',
    fontSize: '12px',
  };

  const resultStyle = {
    fontSize: '12px',
  };

  const questionStyle = {
    fontSize: '12px',
    className: 'justify-content-md-right',
    borderRight: '1px solid #ccc',
  };

  const formatAnswer = (answer) => (
    answer
      ? (
        <>
          <Row>
            <Col>
              A:
              &nbsp;
              {answer.body}
            </Col>
          </Row>
          <Row>
            <Col>
              {
                answer.photos ? answer.photos.map((img, i) => (
                  <Image
                    src={img}
                    width={78}
                    height={78}
                    key={i}
                    thumbnail
                  />
                )) : null
              }
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm="auto" style={answerStyle}>
              {answer.answerer_name === 'Seller' ? (
                <strong>
                  By
                  {answer.answerer_name}
                </strong>
              ) : `By ${answer.answerer_name}`}
              {/* {`By ${answer.answerer_name}`} */}
    &nbsp;
              {formatDate(answer.date)}
            </Col>
            <Col id={answer.id} qid={props.question.question_id} sm="auto" style={answerStyle}>
              Helpful?
              {' '}
              <u onClick={(e) => { handleClick(e); }}>Yes</u>
              (
              {answer.helpfulness}
              )
            </Col>
            <Col sm="auto" style={resultStyle}>
              <u>Report</u>
            </Col>
          </Row>
          <br />
        </>
      ) : null);

  const formatQuestion = () => (
    <Row>
      <Col>
        <strong>
          Q:
          {' '}
          {props.question.question_body}
        </strong>
      </Col>
      <Col id={props.question.question_id} sm="auto" style={questionStyle}>
        Helpful?
        {' '}
        <u onClick={(e) => { handleClick(e); }}>Yes</u>
        (
        {props.question.question_helpfulness}
        )
      </Col>
      <Col sm="auto" style={resultStyle}>
        <u>Add Answer</u>
      </Col>
    </Row>
  );

  return (
    <Container id="questionsContainer">
      {formatQuestion()}
      <br />
      {formatAnswer(oneAnswer)}
      {formatAnswer(twoAnswer)}
    </Container>
  );
}

Q.propTypes = {
  question: PropTypes.shape({
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
  }),
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
  setRender: PropTypes.func,
};

Q.defaultProps = {
  question: null,
  answers: null,
  setRender: null,
};

export default Q;
