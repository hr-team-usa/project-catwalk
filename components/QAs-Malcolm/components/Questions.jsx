/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import Q from './Q';

function Questions({
  productId, productName, count, questions, setRender, setQuestions }) {
  return (
    <>
      { questions.map((item) => (
        <Q
          question={item}
          key={item.question_id}
          answers={item.answers}
          setRender={setRender}
          productId={productId}
          count={count}
          setQuestions={setQuestions}
          productName={productName}
        />
      ))}
    </>
  );
}

Questions.propTypes = {
  productId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  productName: PropTypes.string,
  count: PropTypes.string,
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
  })),
  setRender: PropTypes.func,
  setQuestions: PropTypes.func,
};

Questions.defaultProps = {
  productName: null,
  count: null,
  questions: null,
  setRender: null,
  setQuestions: null,
};

export default Questions;
