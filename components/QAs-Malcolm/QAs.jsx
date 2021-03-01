import React from 'react';
import AddQuestion from './components/AddQuestion';
import Questions from './components/Questions';
import SearchBar from './components/SearchBar';

const QAs = () => (
  <div>
    QUESTIONS & ANSWERS
    <SearchBar />
    <Questions />
    <AddQuestion />
  </div>
);

export default QAs;
