import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddMore from './components/AddMore';
import Questions from './components/Questions';
import QASearchBar from './components/SearchBar';

const QAs = ({ productId, productName }) => {
  const [count, setCount] = useState('&count=4');
  const [searchBody, setSearchBody] = useState('');
  const [submitSearch, setSubmitSearch] = useState(false);


  return (
    <div>
      <QASearchBar
        productId={productId}
        setSearchBody={setSearchBody}
        setSubmitSearch={setSubmitSearch}
      />
      <Questions
        productId={productId}
        setCount={setCount}
        count={count}
        searchBody={searchBody}
        submitSearch={setSubmitSearch}
        setSubmitSearch={setSubmitSearch}
      />
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
