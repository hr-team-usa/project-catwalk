import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReviewsList from './components/ReviewsList';
import ReviewsBreakdown from './components/ReviewsBreakdown';

const Reviews = ({ productId, setProductRating, reviewsRef }) => (
  <Container>
    <h3 ref={reviewsRef}>Ratings & Reviews</h3>
    <Row>
      <Col xs={4}>
        <ReviewsBreakdown
          productId={productId}
          setProductRating={setProductRating}
        />
      </Col>
      <Col><ReviewsList productId={productId} /></Col>
    </Row>
  </Container>
);

Reviews.propTypes = {
  productId: PropTypes.string.isRequired,
  setProductRating: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  reviewsRef: PropTypes.object,
};

Reviews.defaultProps = {
  reviewsRef: {},
};

export default Reviews;
