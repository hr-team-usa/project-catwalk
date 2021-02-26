import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';


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
    <div>
      {questions.map((item, i) =>
      <p index={i}><b>Q: {item.question_body}</b></p>
      )}
      {console.log(questions)}
    </div>
  );
}

export default Questions;
