import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SelectSize from './SelectSize';
import SelectQuantity from './SelectQuantity';
import Add from './Add';

const AddToCart = ({
  styleInfo, setCart, cart, productName,
}) => {
  const [sku, setSku] = useState({ size: 'Select Size', quantity: null });
  const [quantitySelected, setQuantitySelected] = useState(null);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [invalidAdd, setInvalidAdd] = useState(false);
  return (
    <>
      <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
        <Col>
          <SelectSize
            styleInfo={styleInfo}
            setSku={setSku}
            setIsOutOfStock={setIsOutOfStock}
            invalidAdd={invalidAdd}
            setInvalidAdd={setInvalidAdd}
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
          <Add
            quantitySelected={quantitySelected}
            isOutOfStock={isOutOfStock}
            sku={sku}
            setInvalidAdd={setInvalidAdd}
            setCart={setCart}
            cart={cart}
            productName={productName}
          />

        </Col>
      </Row>
    </>
  );
};

AddToCart.propTypes = {
  styleInfo: PropTypes.shape({
    skus: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }),
  setCart: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  cart: PropTypes.array.isRequired,
  productName: PropTypes.string.isRequired,

};

AddToCart.defaultProps = {
  styleInfo: {
    skus: null,
  },
};

export default AddToCart;
