/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductBreakdown from './ProductBreakdown';
import RatingBreakdown from './RatingBreakdown';
import Stars from './Stars'
import config from '../../../config';

const ReviewsBreakdown = ({ productId }) => {

  const [ rating, setRating ] = useState(null);

  const getAvgRating = (product) => {
    const api = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/meta';
    const options = {
      url: `${api}?product_id=${product}`,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      },
    };

    const ratingCreator = (ratingsObj) => {
      let allRatings = 0;
      let ratingCount = 0;
      for (let key in ratingsObj) {
        for (let i = 0; i < ratingsObj[key]; i++) {
          allRatings += Number(key);
          ratingCount++;
        }
      }
      return (allRatings / ratingCount).toFixed(1);
    }

    axios(options)
      .then((res) => {
        return ratingCreator(res.data.ratings);
      })
      .then((result) => {
        setRating(result)
      })
      .catch((err) => { console.log(err); });
  }

  useEffect(() => {
    getAvgRating(productId);
  })

  return (
    <div>
      <div>average-rating: <h4>{rating}</h4></div>
      <Stars rating={rating} />
      <div>percent recommended</div>
      <RatingBreakdown />
      <ProductBreakdown />
    </div>
  );
};

export default ReviewsBreakdown;