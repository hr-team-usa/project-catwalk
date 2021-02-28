/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Review from './Review';

const ReviewsList = props => {
  const [ reviews, setReviews ] = useState([]);
  const [ reviewCount, setReviewCount ] = useState(2);
  const [ sorted, setSorted ] = useState('relevant');

  const getProductReviews = (product, count, sorted) => {
    const api = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/';
    const options = {
      url: `${api}?product_id=${product}&count=${count}&sort=${sorted}`,
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

  const addTwoReviews = (e) => {
    e.preventDefault();
    setReviewCount(reviewCount + 2);
  }

  useEffect(() => {
    getProductReviews(18201, reviewCount, sorted);
  }, [reviewCount, sorted]);

  return (
    <div>
      <div>review-sorting</div>
      {reviews.map((review) => <Review key={review.review_id} review={review} />)}
      <button onClick={(e) => addTwoReviews(e)}>More Reviews</button>
      <button>Add a Review +</button>
    </div>
  );
};

export default ReviewsList;