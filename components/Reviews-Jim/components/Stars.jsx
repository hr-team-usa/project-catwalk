import React from 'react';
import Rating from '@material-ui/lab/Rating';

const Stars = ({ rating }) => (
  <div>
    <Rating className="star-rating" value={Number(rating)} precision={0.25} readOnly />
  </div>
);

export default Stars;

// https://material-ui.com/components/rating/
