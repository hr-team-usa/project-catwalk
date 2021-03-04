import React, { useState } from 'react';
import SelectSize from './SelectSize';
import SelectQuantity from './SelectQuantity';

/* eslint-disable */

const AddToCart = ({ styleInfo }) => {
  const [sku, setSku] = useState(null);
  const [quantitySelected, setQuantitySelected] = useState(null);
  return (
    <div>
      <div>
        <SelectSize
          styleInfo={styleInfo}
          setSku={setSku}
        />
        <SelectQuantity
          sku={sku}
          setQuantitySelected={setQuantitySelected}
        />
        {' '}
      </div>
      <div>
        <span>Add to Cart Button </span>
        <span> Add to Outfits Button</span>
      </div>
    </div>
  )
}

export default AddToCart;
