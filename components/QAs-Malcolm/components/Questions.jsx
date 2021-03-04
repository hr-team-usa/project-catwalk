import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import config from '../../../config';
import Q from './Q';

// eslint-disable-next-line no-unused-vars
function Questions({ productId }) {
  const [questions, setQuestions] = useState([]);
  const id = productId;

  const getQuestions = () => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${id}`,

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
  }, []);

  return (
    <>
      {questions.map((item) => <Q question={item} key={item.question_id} answers={item.answers} />)}
    </>
  );
}

Questions.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Questions;
