import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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
              {productName}
            </Col>
            <Col xs={6} md={4}>
              Compared to
            </Col>
            <Col xs={6} md={4}>
              {relatedName}
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              {productPrice}
            </Col>
            <Col xs={6} md={4}>
              Price
            </Col>
            <Col xs={6} md={4}>
              {relatedPrice}
            </Col>
          </Row>

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
              Rating /
              Stars
            </Col>
            <Col xs={6} md={4}>
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
