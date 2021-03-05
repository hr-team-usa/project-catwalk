/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';

import ProductBreakdown from './ProductBreakdown';
import RatingBreakdown from './RatingBreakdown';

const ReviewsBreakdown = ({ productMeta, setProductRating }) => {
  const [rating, setRating] = useState(null);
  const [recommended, setRecommended] = useState(null);

  const ratingCreator = (ratingsObj) => {
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
  }, []);

  return (
    <div>
      <div className="avg-rating">{rating}</div>
      <Rating className="star-rating" value={Number(rating)} precision={0.25} readOnly />
      <div>
        {recommended}
        % of reviews recommend this product
      </div>
      <RatingBreakdown ratings={productMeta.ratings} />
      <ProductBreakdown />
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
};

ReviewsBreakdown.defaultProps = {
  productMeta: null,
};

export default ReviewsBreakdown;
