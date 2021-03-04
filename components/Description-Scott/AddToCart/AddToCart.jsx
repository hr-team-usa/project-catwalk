import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SelectSize from './SelectSize';
import SelectQuantity from './SelectQuantity';

const AddToCart = ({ styleInfo }) => {
  const [sku, setSku] = useState(null);
  const [quantitySelected, setQuantitySelected] = useState(null);
  return (
    <>
      <Row>
        <Col>
          <SelectSize
            styleInfo={styleInfo}
            setSku={setSku}
          />
        </Col>
        <Col>
          <SelectQuantity
            sku={sku}
            setQuantitySelected={setQuantitySelected}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <span>Add to Cart Button </span>
        </Col>
      </Row>
    </>
  );
};

AddToCart.propTypes = {
  styleInfo: PropTypes.shape({
    skus: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }),
};

AddToCart.defaultProps = {
  styleInfo: {
    skus: null,
  },
};

export default AddToCart;
