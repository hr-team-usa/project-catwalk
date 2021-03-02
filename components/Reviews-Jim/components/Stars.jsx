/* eslint-disable */

import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';

const Stars = props => {

  return (
    <div>
      <Rating className="star-rating" value={Number(props.rating)} precision={0.25} readOnly />
    </div>
  );
};

export default Stars;

// https://material-ui.com/components/rating/