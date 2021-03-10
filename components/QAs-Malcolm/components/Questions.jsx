/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import config from '../../../config';
import Q from './Q';

function Questions({ productId, productName, count, searchBody, submitSearch }) {
  const [render, setRender] = useState(false);
  const [searched, setSearched] = useState([]);
  const [searchBool, setSearchBool] = useState(false);
  const [questions, setQuestions] = useState([]);

  const id = productId;
  // const searched2 = [];
  // if (searched2.length > 0) {
  //   setSearched(searched2);
  // }

  // if (searchBody.length > 3) {
  if (submitSearch === true) {
    setSearchBool(true);
    setSearched(questions.filter(({ question_body }) => question_body.includes(searchBody)));
  }

  const getQuestions = () => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${id}${count}`,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      },
    };

    axios(options)
      .then((res) => setQuestions(res.data.results))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuestions();
    setRender(false);
  }, [render, count]);

  return (
    <>
      {searchBool === false
        ? questions.map((item) => (
          <Q
            question={item}
            key={item.question_id}
            answers={item.answers}
            setRender={setRender}
            productId={id}
            count={count}
            setQuestions={setQuestions}
            productName={productName}
          />
        ))
        : searched.map((item) => (
          <Q
            question={item}
            key={item.question_id}
            answers={item.answers}
            setRender={setRender}
            productId={id}
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
  searchBody: PropTypes.string,
  questions: PropTypes.shape({
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
};

Questions.defaultProps = {
  productName: null,
  count: null,
  searchBody: null,
  questions: null,
};

export default Questions;
