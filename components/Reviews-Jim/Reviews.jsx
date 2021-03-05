/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReviewsList from './components/ReviewsList';
import ReviewsBreakdown from './components/ReviewsBreakdown';

const Reviews = ({ productId, setProductRating, reviewsRef }) => {
  const [productReviews, setProductReviews] = useState(null);
  const [productMeta, setProductMeta] = useState(null);
  const [sortStatus, setSortStatus] = useState('relevant');

  const getProductReviews = (product, sort, count = null) => {
    let api = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/?product_id=${product}&sort=${sort}`;

    if (count) {
      api += `&count=${count}`;
    }

    const options = {
      url: api,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      },
    };

    axios(options)
      .then((res) => {
        setProductReviews(res.data.results);
        console.log('Success!');
      })
      .catch((err) => { console.log('GET REVIEWS ERROR ', err); });
  };

  const getProductMeta = (product) => {
    const api = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/meta';
    const options = {
      url: `${api}?product_id=${product}`,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      },
    };

    axios(options)
      .then((res) => {
        setProductMeta(res.data);
      })
      .catch((err) => { console.log('GET META ERROR ', err); });
  };

  const handleSortChange = (e) => {
    e.preventDefault();
    setSortStatus(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    getProductReviews(productId, sortStatus);
    getProductMeta(productId);
  }, [sortStatus]);

  return (
    <Container>
      <h3 ref={reviewsRef}>Ratings & Reviews</h3>
      <Row>
        <Col xs={4}>
          {productMeta ? (
            <ReviewsBreakdown
              productMeta={productMeta}
              setProductRating={setProductRating}
            />
          ) : null}
        </Col>
        <Col>
          {productReviews ? (
            <ReviewsList
              productReviews={productReviews}
              sortStatus={sortStatus}
              handleSortChange={handleSortChange}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

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
