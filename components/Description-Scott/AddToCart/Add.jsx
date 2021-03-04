import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
/* eslint-disable */
const Add = ({ quantitySelected, isOutOfStock, sku, setInvalidAdd }) => {

  const clickHandler = () => {
    if (sku.size === 'Select Size') {
      setInvalidAdd(true);
    } else {
      //Actual add to cart here...
      alert(`Added to Cart: size - ${sku.size}, quantity: ${quantitySelected}`)
    }
  }

  if (isOutOfStock) {
    return <></>
  } else {
    return (
      <>
        <Button onClick={clickHandler} variant="success">Add to Cart</Button>{' '}
      </>
    )
  }

};

Add.propTypes = {
  quantitySelected: PropTypes.number,
  isOutOfStock: PropTypes.bool.isRequired,
  sku: PropTypes.object,
};

export default Add;

/*
If the default ‘Select Size’ is currently selected: Clicking this button should open the size dropdown, and a message should appear above the dropdown stating “Please select size”.
If there is no stock: This button should be hidden
If both a valid size and valid quantity are selected: Clicking this button will add the product to the user’s cart.

*/