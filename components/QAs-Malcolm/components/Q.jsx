/* eslint-disable */

import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import styles from './Q.module.css';

function Q(props) {

  const [oneAnswer, setOneAnswer] = useState({});
  const [twoAnswer, setTwoAnswer] = useState({});
  const [selectQuestions, setSelectQuestions] = useState([]);

  const parseAnswers = () => {
    var one = Object.keys(props.answers).slice(0, 1);
    var two = Object.keys(props.answers).slice(1, 2);
    setOneAnswer(props.question.answers[one])
    setTwoAnswer(props.question.answers[two])
  }

  useEffect(() => {
    parseAnswers();
  }, []);

  //WRAP

  const formateDate = (stringDate) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
    return new Date(stringDate).toLocaleDateString(undefined, options);
  }
  const answerStyle = {
    'borderRight': "1px solid #ccc",
    fontSize: "12px"
  }

  const resultStyle = {
    fontSize: "12px"
  }

  const questionStyle = {
    fontSize: "12px",
    className: "justify-content-md-right",
    'borderRight': "1px solid #ccc"
  }
  return (
    < Container >
      <Row>
        <Col><b>
          Q: {props.question.question_body}
        </b></Col>
        <Col sm="2" style={questionStyle}>
          Helpful? <u>Yes</u>({props.question.question_helpfulness})
        </Col>
        <Col sm="3" style={resultStyle}>
          <u>Add Answer</u>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col >
          {oneAnswer ? `A: ${oneAnswer.body}` : null}
        </Col>
      </Row>
      <Row>
        <Col>
          {oneAnswer ?
            (oneAnswer.photos ? oneAnswer.photos.map((img, i) => {
              return (
                <Image
                  src={img}
                  width={78}
                  height={78}
                  key={i}
                />
              )
            }) : null) : null
          }
        </Col>
      </Row>
      <br></br>
      <Row >
        <Col sm="3" style={answerStyle}>
          {oneAnswer ? `By ${oneAnswer.answerer_name}` : null}
      &nbsp;
      {oneAnswer ? formateDate(oneAnswer.date) : null}
        </Col>
        <Col sm="3" style={answerStyle}>
          Helpful? <u>Yes</u>({oneAnswer ? oneAnswer.helpfulness : null})
        </Col>
        <Col sm="3" style={resultStyle}>
          <u>Report</u>
        </Col>
      </Row>

      <br></br>
      {twoAnswer ?
        <><Row>
          <Col >
            {twoAnswer ? `A: ${twoAnswer.body}` : null}
          </Col>
        </Row>
          <Row>
            <Col>
              {twoAnswer ?
                (twoAnswer.photos ? twoAnswer.photos.map((img, i) => {
                  return (
                    <Image
                      src={img}
                      width={78}
                      height={78}
                      key={i}
                    />
                  )
                }) : null) : null
              }
            </Col>
          </Row>
          <br></br>
          <Row >
            <Col sm="3" style={answerStyle}>
              {twoAnswer ? `By ${twoAnswer.answerer_name}` : null}
      &nbsp;
      {twoAnswer ? formateDate(twoAnswer.date) : null}
            </Col>
            <Col sm="3" style={answerStyle}>
              Helpful? <u>Yes</u>({twoAnswer ? twoAnswer.helpfulness : null})
        </Col>
            <Col sm="3" style={resultStyle}>
              <u>Report</u>
            </Col>
          </Row><br></br></>
        : null
      }

    </Container >
  );
}
// By {oneAnswer ? oneAnswer.answerer_name : null} {oneAnswer ? oneAnswer.date.slice(0, 10) : null}

export default Q;
