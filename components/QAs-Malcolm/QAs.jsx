import React from 'react';
import PropTypes from 'prop-types';
import AddQuestion from './components/AddQuestion';
import Questions from './components/Questions';
import QASearchBar from './components/SearchBar';

const QAs = ({ productId }) => (
  <div>
    <QASearchBar />
    <Questions productId={productId} />
    <AddQuestion />
  </div>
);

QAs.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default QAs;
