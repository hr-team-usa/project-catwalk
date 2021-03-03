import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';

const Stars = ({ rating }) => (
  <div>
    <Rating className="star-rating" value={Number(rating)} precision={0.25} readOnly />
  </div>
);

Stars.propTypes = {
  rating: PropTypes.string,
};

Stars.defaultProps = {
  rating: null,
};

export default Stars;

// https://material-ui.com/components/rating/
