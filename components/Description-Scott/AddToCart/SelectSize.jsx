/* eslint-disable */
import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const SelectSize = ({ styleInfo }) => {
  const [currentSize, setCurrentSize] = useState('Select Size');
  const [sizesAvailable, setSizesAvailable] = useState([]);

  const populateSKUs = () => {
    console.log('STYLE INFOOO.skus', styleInfo.skus);
    const sizes = [];
    for (const key in styleInfo.skus) {
      if (styleInfo.skus[key].quantity > 0) {
        sizes.push(styleInfo.skus[key].size);
      }
    }
    console.log('sizes:', sizes);
    setSizesAvailable(sizes);
    // use this for testing 'out of stock':
    // setSizesAvailable([]);
  };

  useEffect(() => {
    console.log('styleInfo: ', styleInfo);
    setCurrentSize('Select Size');
    populateSKUs();
  }, [styleInfo]);

  if (sizesAvailable.length === 0) {
    var emptyStock = (
      <DropdownButton disabled id="dropdown-basic-button" title='Out of Stock'>
      </DropdownButton>);
  } else {
    var stock = (
      <DropdownButton
        id="dropdown-basic-button"
        title={currentSize}>
        {sizesAvailable.map((size, i) => (
          <Dropdown.Item onClick={() => setCurrentSize(size)}
            key={i}>{`${size}`}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }

  return (
    <div>
      {sizesAvailable.length > 0 ? stock : emptyStock}
    </div>

  );
};
export default SelectSize;

// SelectSize.PropTypes.shape({
//   style_id: PropTypes.number,
//   name: PropTypes.string,
// });
