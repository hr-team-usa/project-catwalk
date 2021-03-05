/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';

// import NumRating from './NumRating';
import ProductBreakdown from './ProductBreakdown';
import RatingBreakdown from './RatingBreakdown';
// import Stars from './Stars';
import config from '../../../config';

const ReviewsBreakdown = ({ productId, setProductRating }) => {
  const [productMeta, setProductMeta] = useState(null);
  const [rating, setRating] = useState(null);
  const [recommended, setRecommended] = useState(null);
  // const [numRatings, setNumRatings] = useState({});

  const getProductMeta = (product) => {
    const api = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/meta';
    const options = {
      url: `${api}?product_id=${product}`,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      },
    };

    axios(options)
      .then((res) => {
        setProductMeta(res.data);
      })
      .catch((err) => { console.log(err); });
  };

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
    getProductMeta(productId);
  }, []);

  useEffect(() => {
    if (productMeta) {
      ratingCreator(productMeta.ratings);
      reviewPercentage(productMeta.ratings, productMeta.recommended.true);
      // setNumRatings(productMeta.ratings);
    }
  }, [productMeta]);

  return (
    <div>
      <div className="avg-rating">{rating}</div>
      {/* <NumRating ratings={numRatings} /> */}
      <Rating className="star-rating" value={Number(rating)} precision={0.25} readOnly />
      <div>
        {recommended}
        % of reviews recommend this product
      </div>
      {productMeta ? <RatingBreakdown ratings={productMeta.ratings} /> : null}
      <ProductBreakdown />
    </div>
  );
};

ReviewsBreakdown.propTypes = {
  productId: PropTypes.string.isRequired,
  setProductRating: PropTypes.func.isRequired,
};

export default ReviewsBreakdown;
