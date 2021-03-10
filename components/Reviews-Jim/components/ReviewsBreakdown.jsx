/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';

import ProductBreakdown from './ProductBreakdown';
import RatingBreakdown from './RatingBreakdown';

const ReviewsBreakdown = ({
  productMeta, setProductRating, selectedRatings, setSelectedRatings, setRatingsLength,
}) => {
  const [rating, setRating] = useState(null);
  const [recommended, setRecommended] = useState(null);

  const ratingCreator = (ratingsObj) => {
    if (!Object.keys(ratingsObj).length) {
      setProductRating(null);
      return setRating(null);
    }
    let allRatings = 0;
    let ratingCount = 0;
    const keys = Object.keys(ratingsObj);
    const values = Object.values(ratingsObj);
    for (let i = 0; i < keys.length; i += 1) {
      allRatings += Number(keys[i]) * Number(values[i]);
      ratingCount += Number(values[i]);
    }
    setProductRating((allRatings / ratingCount).toFixed(1));
    return setRating((allRatings / ratingCount).toFixed(1));
  };

  const reviewPercentage = (ratings, recommend) => {
    if (!recommend) {
      return setRecommended(0);
    }
    if (!Object.keys(ratings).length) {
      return setRecommended('empty');
    }
    let totalRatings = 0;
    const values = Object.values(ratings);
    for (let i = 0; i < values.length; i += 1) {
      totalRatings += Number(values[i]);
    }
    return setRecommended(Math.floor((Number(recommend) / totalRatings) * 100));
  };

  useEffect(() => {
    ratingCreator(productMeta.ratings);
    reviewPercentage(productMeta.ratings, productMeta.recommended.true);
  }, [productMeta]);

  return (
    <div>
      <div className="avg-rating">{rating}</div>
      <Rating className="star-rating" value={Number(rating)} precision={0.25} readOnly />
      <br />
      {recommended ? (
        <>
          {recommended}
          % of reviews recommend this product
        </>
      ) : <>No reviews recommend this product</>}
      <RatingBreakdown
        ratings={productMeta.ratings}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
        setRatingsLength={setRatingsLength}
      />
      <ProductBreakdown characteristics={productMeta.characteristics} />
    </div>
  );
};

ReviewsBreakdown.propTypes = {
  productMeta: PropTypes.shape({
    ratings: PropTypes.shape({
      1: PropTypes.string,
      2: PropTypes.string,
      3: PropTypes.string,
      4: PropTypes.string,
      5: PropTypes.string,
    }),
    recommended: PropTypes.shape({
      true: PropTypes.string,
    }),
  }),
  setProductRating: PropTypes.func.isRequired,
  selectedRatings: PropTypes.arrayOf(PropTypes.number),
  setSelectedRatings: PropTypes.func.isRequired,
  setRatingsLength: PropTypes.func.isRequired,
};

ReviewsBreakdown.defaultProps = {
  productMeta: null,
  selectedRatings: PropTypes.arrayOf(null),
};

export default ReviewsBreakdown;
