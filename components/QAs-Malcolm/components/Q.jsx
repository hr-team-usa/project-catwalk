/* eslint-disable */

import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Q(props) {

  const [oneAnswer, setOneAnswer] = useState({});
  const [twoAnswer, setTwoAnswer] = useState({});
  const [selectQuestions, setSelectQuestions] = useState([]);

  const parseAnswers = () => {
    var one = Object.keys(props.answers).slice(0, 1);
    var two = Object.keys(props.answers).slice(1, 2);

    // console.log(props.question.answers[one])
    setOneAnswer(props.question.answers[one])
    setTwoAnswer(props.question.answers[two])
  }

  // console.log(oneAnswer)
  useEffect(() => {
    parseAnswers();
    // parseQuestions();
    // setSelectAnswers(top2);
  }, []);

  //WRAP

  return (

    <Container>
      <Row>
        <Col><b>
          Q: {props.question.question_body}
        </b></Col>
      </Row>
      <Row>
        <Col>
          A: {oneAnswer ? oneAnswer.body : null}
          <br></br>
        </Col>
      </Row>
    </Container>
  );
}
// By {oneAnswer ? oneAnswer.answerer_name : null} {oneAnswer ? oneAnswer.date.slice(0, 10) : null}

export default Q;
