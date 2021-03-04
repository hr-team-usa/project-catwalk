import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SelectSize from './SelectSize';
import SelectQuantity from './SelectQuantity';
import Add from './Add';

const AddToCart = ({ styleInfo }) => {
  const [sku, setSku] = useState({ size: 'Select Size', quantity: null });
  const [quantitySelected, setQuantitySelected] = useState(null);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  return (
    <>
      <Row>
        <Col>
          <SelectSize
            styleInfo={styleInfo}
            setSku={setSku}
            setIsOutOfStock={setIsOutOfStock}
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
          <Add quantitySelected={quantitySelected} isOutOfStock={isOutOfStock} sku={sku} />
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
