import React from 'react';
import SelectSize from './SelectSize';

const AddToCart = ({ styleInfo }) => (
  <div>
    <div>
      <SelectSize styleInfo={styleInfo} />
      <span>
        Quantity Dropdown
      </span>
      {' '}
    </div>
    <div>
      <span>Add to Cart Button </span>
      <span> Add to Outfits Button</span>
    </div>
  </div>
);

export default AddToCart;
