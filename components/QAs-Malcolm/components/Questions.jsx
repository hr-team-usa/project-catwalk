import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import config from '../../../config';
import Q from './Q';

// eslint-disable-next-line no-unused-vars
function Questions({ productId, productName }) {
  const [questions, setQuestions] = useState([]);
  const [render, setRender] = useState(false);
  const id = productId;
  const count = 'count=4';

  const getQuestions = () => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${id}&${count}`,
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
  }, [render]);

  return (
    <>
      {questions.map((item) => (
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
};

Questions.defaultProps = {
  productName: null,
};

export default Questions;
