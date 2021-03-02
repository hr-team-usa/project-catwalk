import React, { useState, useEffect } from 'react';
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
    for (const key in ratingsObj) {
      for (let i = 0; i < ratingsObj[key]; i++) {
        allRatings += Number(key);
        ratingCount++;
      }
    }
    return setRating((allRatings / ratingCount).toFixed(1));
  };

  const reviewPercentage = (ratings, recommended) => {
    let totalRatings = 0;
    for (const key in ratings) {
      totalRatings += Number(ratings[key]);
    }
    return setRecommended(Math.floor((Number(recommended) / totalRatings) * 100));
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
      <RatingBreakdown />
      <ProductBreakdown />
    </div>
  );
};

export default ReviewsBreakdown;
