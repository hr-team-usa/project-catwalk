/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const Reviews = () => {
  const [ reviews, setReviews ] = useState([]);

  const getAllReviews = (query) => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/?${query}`,
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
    getAllReviews('product_id=18201');
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review) =>
      <div key={review.review_id}>
        <h3>{review.summary}</h3>
        <p>{review.body}</p>
      </div>)}
    </div>
  );
};

export default Reviews;
