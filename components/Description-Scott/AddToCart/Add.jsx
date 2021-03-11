import React from 'react';
import { useTracking } from 'react-tracking';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import 'bootswatch/dist/lux/bootstrap.min.css';

const Add = ({
  quantitySelected, isOutOfStock, sku, setInvalidAdd, setCart, cart, productName,
}) => {
  const { trackEvent } = useTracking({ module: 'Product Overview' });
  const clickHandler = () => {
    if (sku.size === 'Select Size') {
      setInvalidAdd(true);
    } else {
      // Actual add to cart here...
      setCart([...cart, { name: productName, size: sku.size, quantity: quantitySelected }]);
    }
    trackEvent({ element: 'Add to Cart', time: new Date() });
  };

  if (isOutOfStock) {
    return <></>;
  }
  return (
    <>
      <Button
        style={{ marginTop: '5px', width: '40%' }}
        onClick={clickHandler}
        variant="primary"
      >
        Add to Cart
      </Button>
      {' '}
    </>
  );
};

Add.propTypes = {
  quantitySelected: PropTypes.number,
  isOutOfStock: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sku: PropTypes.object,
  setInvalidAdd: PropTypes.func.isRequired,
  setCart: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  cart: PropTypes.array.isRequired,
  productName: PropTypes.string.isRequired,
};

Add.defaultProps = {
  quantitySelected: 0,
  sku: null,
};

export default Add;
