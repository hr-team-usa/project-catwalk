/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Q from './Q';

function Questions() {
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    const options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=18201',

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
    <React.Fragment>
      {questions.map((item, i) => {
        return <Q question={item} key={item.question_id} answers={item.answers}/>
      })}
    </React.Fragment>
  );
}

export default Questions;
