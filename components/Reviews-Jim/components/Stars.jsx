/* eslint-disable */

import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';

const Stars = ({ rating }) => {

  return (
    <div>
      <Rating className="star-rating" value={Number(rating)} precision={0.25} readOnly />
    </div>
  );
};

export default Stars;

// https://material-ui.com/components/rating/