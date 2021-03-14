import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AddMore from './components/AddMore';
import Questions from './components/Questions';
import QASearchBar from './components/SearchBar';
import config from '../../config';

const QAs = ({ productId, productName }) => {
  const [count, setCount] = useState('&count=4');
  const [render, setRender] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [searchMatch, setSearchedMatch] = useState(null);

  const getQuestions = () => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${productId}${count}`,
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
  }, [render, count, productId]);

  return (
    <div>
      <QASearchBar
        productId={productId}
        setSearchedMatch={setSearchedMatch}
        questions={questions}
      />
      <div style={{ overflowY: 'scroll', height: 'auto', maxHeight: '80vh' }}>
        <Questions
          productId={productId}
          setCount={setCount}
          count={count}
          questions={(searchMatch || questions)}
          setRender={setRender}
          setQuestions={setQuestions}
        />
      </div>
      <AddMore
        productId={productId}
        productName={productName}
        setCount={setCount}
        count={count}
      />
    </div>
  );
};

QAs.propTypes = {
  productId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  productName: PropTypes.string.isRequired,
};

export default QAs;
