import React from 'react';
import AddQuestion from './components/AddQuestion';
import Questions from './components/Questions';
import QASearchBar from './components/SearchBar';

const QAs = ({ productId }) => (
  <div>
    QUESTIONS & ANSWERS
    <QASearchBar />
    <Questions productId={productId} />
    <AddQuestion />
  </div>
);

export default QAs;
