/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Review from './Review';

const ReviewsList = ({ productReviews, sortStatus, handleSortChange }) => {
  // const [allReviews, setAllReviews] = useState(productReviews);
  const [renderedReviews, setRenderedReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(2);

  const renderReviewList = (reviews, count) => {
    const renderArray = [];
    if (count <= reviews.length) {
      for (let i = 0; i < count; i += 1) {
        renderArray.push(reviews[i]);
      }
      setRenderedReviews(renderArray);
    } else {
      setRenderedReviews(reviews);
    }
  };

  const addTwoReviews = (e) => {
    e.preventDefault();
    setReviewCount(reviewCount + 2);
  };

  useEffect(() => {
    // setAllReviews(productReviews);
    renderReviewList(productReviews, reviewCount);
  }, [reviewCount, sortStatus]);

  return (
    <>
      <>
        XXX reviews, sorted by
        <select
          value={sortStatus}
          onChange={(e) => handleSortChange(e)}
        >
          <option value="relevant">Relevant</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </>
      {renderedReviews.map((review) => <Review key={review.review_id} review={review} />)}
      <button type="button" onClick={(e) => addTwoReviews(e)}>More Reviews</button>
      <button type="button">Add a Review +</button>
    </>
  );
};

ReviewsList.propTypes = {
  productReviews: PropTypes.arrayOf(PropTypes.shape({
    rating: PropTypes.number.isRequired,
    reviewer_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })),
    recommended: PropTypes.bool,
    response: PropTypes.string,
    helpfulness: PropTypes.number.isRequired,
  })),
};

ReviewsList.defaultProps = {
  productReviews: null,
};

export default ReviewsList;
