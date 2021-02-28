/* eslint-disable */

import React, { useState, useEffect } from 'react';
import ProductBreakdown from './ProductBreakdown';
import RatingBreakdown from './RatingBreakdown';
import Stars from './Stars'

const ReviewsBreakdown = () => {

  return (
    <div>
      <div>average-rating</div>
      <Stars />
      <div>percent recommended</div>
      <RatingBreakdown />
      <ProductBreakdown />
    </div>
  );
};

export default ReviewsBreakdown;