/* eslint-disable */

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Review = props => {

  const review = props.review;

  return (
    <div key={review.review_id}>
      <div>rating: {review.rating}</div>
      <div>reviewer: {review.reviewer_name} date: {review.date}</div>
      <div>{review.summary}</div>
      <div>{review.body}</div>
      {review.photos.map((photo) =>
        <img key={photo.id} src={photo.url}/>
      )}
      <div>recommended: {review.recommended}</div>
      {review.response ? <div>{review.response}</div> : null}
      <div>Helpful? Yes ({review.helpfulness})</div>
      <div>Report</div>

      <style jsx>{`
          img {
            height: 150px;
          }
      `}</style>

    </div>
  );
};

export default Review;