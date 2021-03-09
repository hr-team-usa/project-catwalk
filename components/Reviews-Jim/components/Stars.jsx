import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';

const Stars = ({ style, rating }) => (
  <div style={style}>
    <Rating className="star-rating" value={Number(rating)} precision={0.25} readOnly />
  </div>
);

Stars.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  rating: PropTypes.string,
};

Stars.defaultProps = {
  style: null,
  rating: null,
};

export default Stars;

// https://material-ui.com/components/rating/
