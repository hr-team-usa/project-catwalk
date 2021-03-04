import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const NumRating = ({ ratings }) => {
  const [rating, setRating] = useState(null);

  const ratingCreator = (ratingsObj) => {
    let allRatings = 0;
    let ratingCount = 0;
    const keys = Object.keys(ratingsObj);
    const values = Object.values(ratingsObj);
    for (let i = 0; i < keys.length; i += 1) {
      allRatings += Number(keys[i]) * Number(values[i]);
      ratingCount += Number(values[i]);
    }
    return setRating((allRatings / ratingCount).toFixed(1));
  };

  useEffect(() => {
    ratingCreator(ratings);
  });

  return (
    <>
      <>{rating}</>
    </>
  );
};

NumRating.propTypes = {
  ratings: PropTypes.shape({
    1: PropTypes.string,
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
  }),
};

NumRating.defaultProps = {
  ratings: null,
};

export default NumRating;
