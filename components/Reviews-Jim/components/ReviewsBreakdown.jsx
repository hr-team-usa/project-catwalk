/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ProductBreakdown from './ProductBreakdown';
import RatingBreakdown from './RatingBreakdown';
import Stars from './Stars';
import config from '../../../config';

const ReviewsBreakdown = ({ productId }) => {
  const [productMeta, setProductMeta] = useState(null);
  const [rating, setRating] = useState(null);
  const [recommended, setRecommended] = useState(null);

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
    }
  }, [productMeta]);

  return (
    <div>
      <div><h4>{rating}</h4></div>
      <Stars rating={rating} />
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
};

export default ReviewsBreakdown;
