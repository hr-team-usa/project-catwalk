/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Review from './Review';

const ReviewsList = () => {
  const [ reviews, setReviews ] = useState([]);

  const getProductReviews = (product) => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/?${product}`,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      },
    };

    axios(options)
      .then((res) => {
        setReviews(res.data.results);
      })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    getProductReviews('product_id=18201');
  }, []);

  return (
    <div>
      <div>review-sorting</div>
      {reviews.map((review) => <Review review={review} />)}
      <button>more-reviews</button>
      <button>add a review</button>
    </div>
  );
};

export default ReviewsList;