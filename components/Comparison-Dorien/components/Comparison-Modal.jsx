import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import { Container, Row, Col } from 'react-bootstrap';
import Stars from '../../Reviews-Jim/components/Stars';

const Comparison_Modal = (props) => {
  const divProps = { ...props };
  delete divProps.arrowProps;
  divProps.show = 'true';

  let productName = '';
  let relatedName = '';
  let productPrice = '';
  let relatedPrice = '';
  let productRating = '';
  let relatedRating = '';
  let starStyle = {};
  // let productSizes = [];
  // let relatedSizes = [];

  if (props.popper.state) {
    productName = divProps.popper.state.options.productName;
    relatedName = divProps.popper.state.options.relatedName;
    relatedPrice = divProps.popper.state.options.relatedPrice;
    productRating = divProps.popper.state.options.productRating;
    relatedRating = divProps.popper.state.options.relatedRating;
    starStyle = divProps.popper.state.options.style;
    productPrice = divProps.popper.state.options.productStyle.original_price;
    // productSizes = Object.values(divProps.popper.state.options.productStyle.skus);
    // relatedSizes = Object.values(divProps.popper.state.options.relatedStyle.skus);

    // console.log(productSizes[0].quantity);
    // console.log(relatedSizes[0].quantity);
}

  return (
    (divProps.popper
    && (
    <Modal.Dialog
      {...divProps}
    >
      <Modal.Header>
        <Modal.Title>Comparing</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <h6>{productName}</h6>
            </Col>
            <Col xs={6} md={4}>
              <h6>Compared to</h6>
            </Col>
            <Col xs={6} md={4}>
              <h6 style={{ display: 'flex', justifyContent: 'flex-end', textAlign: '-webkit-right' }}>{relatedName}</h6>
            </Col>
          </Row>
          <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
          <Row>
            <Col xs={6} md={4}>
              <h6>{productPrice}</h6>
            </Col>
            <Col xs={6} md={4}>
              <h6>Price</h6>
            </Col>
            <Col xs={6} md={4}>
              <h6 style={{ display: 'flex', justifyContent: 'flex-end' }}>{relatedPrice}</h6>
            </Col>
          </Row>
          <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
          <Row>
            <Col xs={6} md={4}>
              {productRating}
              {productRating !== 'NaN' || productRating !== undefined ? (
                <>
                  <Stars
                    style={starStyle}
                    rating={productRating}
                  />
                </>
              ) : null}
            </Col>
            <Col xs={6} md={4}>
              <h6>Rating / Stars</h6>
            </Col>
            <Col xs={6} md={4} style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-end' }}>
              {relatedRating}
              {relatedRating !== 'NaN' || relatedRating !== undefined ? (
                <>
                  <Stars
                    style={starStyle}
                    rating={relatedRating}
                  />
                </>
              ) : null}
            </Col>
          </Row>

        </Container>
      </Modal.Body>

      <Modal.Footer />
    </Modal.Dialog>
    )
    )
  );
};

export default Comparison_Modal;
