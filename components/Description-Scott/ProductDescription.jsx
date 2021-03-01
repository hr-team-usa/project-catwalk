/* eslint-disable */
import React from 'react';
import ImageGallery from './ImageGallery.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const ProductDescription = () => (
  // should receive productId state as a prop from index
  <div>
    <Container>
      <Row>
        <Col>
          <ImageGallery />
        </Col>
        <Col>
          <div> Product Info Component will go here </div>
          <div> Style Selector will go here </div>
          <div> Add to Cart will go here </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default ProductDescription;
