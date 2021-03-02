import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReviewsList from './components/ReviewsList';
import ReviewsBreakdown from './components/ReviewsBreakdown';

const Reviews = ({ productId }) => (
  <Container>
    <h3>Ratings & Reviews</h3>
    <Row>
      <Col xs={4}><ReviewsBreakdown productId={productId} /></Col>
      <Col><ReviewsList productId={productId} /></Col>
    </Row>
  </Container>
);

export default Reviews;
