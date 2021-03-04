import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReviewsList from './components/ReviewsList';
import ReviewsBreakdown from './components/ReviewsBreakdown';

const Reviews = ({ productId, setProductRating }) => (
  <Container>
    <h3>Ratings & Reviews</h3>
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
};

export default Reviews;
