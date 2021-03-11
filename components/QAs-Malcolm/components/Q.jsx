/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Row, Col, Container, Button, Image,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config';
import AddAnswer from './AddAnswer';
import ImageModal from './ImageModal';

function Q(props) {
  const [oneAnswer, setOneAnswer] = useState({});
  const [twoAnswer, setTwoAnswer] = useState({});
  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [moreAnswers, setMoreAnswers] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [moreAnsBtn, setMoreAnsBtn] = useState(false);
  const [photosArr, setPhotosArr] = useState([]);

  const btnTxt = moreAnsBtn === false ? 'Load More Answers' : 'Show Less Answers';

  const parseAnswers = () => {
    let one = Object.keys(props.answers).slice(0, 1);
    let two = Object.keys(props.answers).slice(1, 2);
    const all = Object.keys(props.answers);
    if (all.length > 2) {
      setMoreAnswers(true);
    }
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
    setAllAnswers(all);
  };

  useEffect(() => {
    parseAnswers();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (clicked === false) {
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
      axios(options)
        .then(() => props.setRender(true))
        .then(() => setClicked(true))
        .catch((err) => console.log(err));
    } else {
      window.alert("We're glad you found this helpful!");
    }
  };

  const report = (e) => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/${e.target.id}/report`,
      method: 'put',
      headers: {
        Authorization: config.TOKEN,
      },
    };
    axios(options)
      .then(() => { e.target.innerHTML = 'Reported'; })
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

  const overflowStyle = {
    overflow: 'scroll',
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
                  <>
                    <Image
                      src={img}
                      width={78}
                      height={78}
                      key={i}
                      thumbnail
                      onClick={() => setShowImage(true)}
                    />
                    <ImageModal
                      variant="primary"
                      show={showImage}
                      onHide={() => setShowImage(false)}
                      img={answer.photos[i]}
                      key={i + 1}
                    />
                  </>
                )) : null
              }
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm="auto" style={answerStyle}>
              {answer.answerer_name === 'Seller' ? (
                <strong>
                  By &nbsp;
                  {answer.answerer_name}
                </strong>
              ) : `By ${answer.answerer_name}`}
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
              <u id={props.question.question_id} onClick={(e) => report(e)}>Report</u>
            </Col>
          </Row>
          <br />
        </>
      ) : null
  );

  const formatQuestion = () => (
    <Row style={overflowStyle}>
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
        <u onClick={() => setShow(true)}>Add Answer</u>
        <AddAnswer
          variant="primary"
          show={show}
          onHide={() => setShow(false)}
          productId={props.productId}
          questionId={props.question.question_id}
        />
      </Col>
    </Row>
  );

  const formatAll = () => {
    for (let i = 0; i < allAnswers.length; i += 1) {
      return formatAnswer(props.question.answers[allAnswers[i]]);
    }
  };

  return (
    <Container id="questionsContainer">
      {formatQuestion()}
      <br />
      {formatAnswer(oneAnswer)}
      {formatAnswer(twoAnswer)}
      {moreAnsBtn ? formatAll() : null}
      <Row>
        <Col>
          {moreAnswers
            ? <Button variant="outline-secondary" size="sm" onClick={() => setMoreAnsBtn(!moreAnsBtn)}>{btnTxt}</Button> : null}
        </Col>
      </Row>
      <br />
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
  productId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

Q.defaultProps = {
  question: null,
  answers: null,
  setRender: null,
};

export default Q;
