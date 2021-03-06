/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import Review from './Review';
import NewReviewForm from './NewReviewForm';

const ReviewsList = ({
  productReviews, sortStatus, handleSortChange,
  renderToggle, setRenderToggle, selectedRatings, ratingsLength,
}) => {
  const [renderedReviews, setRenderedReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(2);
  const [show, setShow] = useState(false);

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

  const filterReviewList = (reviews, count, ratingArray) => {
    if (ratingsLength) {
      const filterArray = [];
      for (let i = 0; i < count; i += 1) {
        if (ratingArray.includes(reviews[i].rating)) {
          filterArray.push(reviews[i]);
        }
      }
      setRenderedReviews(filterArray);
    } else {
      renderReviewList(productReviews, reviewCount);
    }
  };

  const addTwoReviews = (e) => {
    e.preventDefault();
    setReviewCount(reviewCount + 2);
  };

  useEffect(() => {
    renderReviewList(productReviews, reviewCount);
    setRenderToggle(false);
  }, [reviewCount, renderToggle]);

  useEffect(() => {
    filterReviewList(productReviews, reviewCount, selectedRatings);
  }, [ratingsLength]);

  return (
    <div>
      <div>
        XXX reviews, sorted by
        <select
          value={sortStatus}
          onChange={(e) => handleSortChange(e)}
        >
          <option value="relevant">Relevant</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      {renderedReviews.map((review) => <Review key={review.review_id} review={review} />)}
      <Button onClick={(e) => addTwoReviews(e)}>More Reviews</Button>
      <Button onClick={() => setShow(true)}>Add a Review +</Button>
      <NewReviewForm show={show} onHide={() => setShow(false)} />
    </div>
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
  sortStatus: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  renderToggle: PropTypes.bool.isRequired,
  setRenderToggle: PropTypes.func.isRequired,
  selectedRatings: PropTypes.arrayOf(PropTypes.number),
  ratingsLength: PropTypes.number.isRequired,
};

ReviewsList.defaultProps = {
  productReviews: null,
  selectedRatings: PropTypes.arrayOf(null),
};

export default ReviewsList;
