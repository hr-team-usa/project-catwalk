import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddMore from './components/AddMore';
import Questions from './components/Questions';
import QASearchBar from './components/SearchBar';

const QAs = ({ productId, productName }) => {
  const [count, setCount] = useState('&count=4');

  return (
    <div>
      <QASearchBar productId={productId} />
      <Questions productId={productId} setCount={setCount} count={count} />
      <AddMore productId={productId} productName={productName} setCount={setCount} count={count} />
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
