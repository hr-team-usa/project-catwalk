import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const Add = ({
  quantitySelected, isOutOfStock, sku, setInvalidAdd,
}) => {
  const clickHandler = () => {
    if (sku.size === 'Select Size') {
      setInvalidAdd(true);
    } else {
      // Actual add to cart here...
      alert(`Added to Cart: size - ${sku.size}, quantity: ${quantitySelected}`);
    }
  };

  if (isOutOfStock) {
    return <></>;
  }
  return (
    <>
      <Button
        style={{ marginTop: '5px', width: '120px' }}
        onClick={clickHandler}
        variant="success"
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
};

Add.defaultProps = {
  quantitySelected: 0,
  sku: null,
};

export default Add;
