import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './SelectSize.module.css';

const SelectSize = ({ styleInfo, setSku }) => {
  const [currentSize, setCurrentSize] = useState('Select Size');
  const [sizesAvailable, setSizesAvailable] = useState([]);

  const populateSKUs = () => {
    const skusAvailable = [];
    if (styleInfo.skus) {
      const skus = Object.values(styleInfo.skus);
      for (let i = 0; i < skus.length; i += 1) {
        if (skus[i].quantity > 0) {
          skusAvailable.push(skus[i]);
        }
      }
    }
    setSizesAvailable(skusAvailable);
    // use this for testing 'out of stock':
    // setSizesAvailable([]);
  };

  const clickHandler = (sku) => {
    setCurrentSize(sku.size);
    setSku(sku);
  };

  useEffect(() => {
    setCurrentSize('Select Size');
    populateSKUs();
  }, [styleInfo]);

  if (sizesAvailable.length === 0) {
    // eslint-disable-next-line vars-on-top
    var emptyStock = ( // eslint-disable-line no-var

      <DropdownButton className={styles.dropdown} disabled id="dropdown-basic-button" title="Out of Stock" />);
  } else {
    // eslint-disable-next-line vars-on-top
    var stock = ( // eslint-disable-line no-var
      <DropdownButton
        className={styles.dropdown}
        id="dropdown-basic-button"
        title={currentSize}
      >
        {sizesAvailable.map((sku, i) => (
          <Dropdown.Item
            onClick={() => {
              clickHandler(sku);
            }}
            key={i} // eslint-disable-line react/no-array-index-key
          >
            {`${sku.size}`}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }

  return (
    <span>
      {/* eslint-disable-next-line block-scoped-var */}
      {sizesAvailable.length > 0 ? stock : emptyStock}
    </span>
  );
};

SelectSize.propTypes = {
  styleInfo: PropTypes.shape({
    skus: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }),
  setSku: PropTypes.func.isRequired,
};

SelectSize.defaultProps = {
  styleInfo: {
    skus: null,
  },
};

export default SelectSize;
