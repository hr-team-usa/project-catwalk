import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const SelectQuantity = ({ sku, setQuantitySelected }) => {
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [quantityAvailable, setQuantityAvailable] = useState(0);

  const checkQuantity = () => {
    if (sku) {
      setQuantityAvailable(sku.quantity);
      setCurrentQuantity(1);
      setQuantitySelected(1);
    }
  };

  const clickHandler = (quantity) => {
    setQuantitySelected(quantity);
    setCurrentQuantity(quantity);
  };

  useEffect(() => {
    checkQuantity();
  }, [sku]);

  if (quantityAvailable === 0 || quantityAvailable === null) {
    // eslint-disable-next-line vars-on-top
    var emptyStock = ( // eslint-disable-line no-var

      <DropdownButton disabled id="dropdown-basic-button" title="-" />);
  } else {
    const quantities = [];
    for (let q = 1; q <= quantityAvailable; q += 1) {
      if (q > 15) {
        break;
      }
      quantities.push(q);
    }
    // eslint-disable-next-line vars-on-top
    var stock = ( // eslint-disable-line no-var
      <DropdownButton
        id="dropdown-basic-button"
        title={currentQuantity}
      >
        {quantities.map((q) => (
          <Dropdown.Item
            onClick={() => {
              clickHandler(q);
            }}
            key={q} // eslint-disable-line react/no-array-index-key
          >
            {`${q}`}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }

  return (
    <span>
      {/* eslint-disable-next-line block-scoped-var */}
      {quantityAvailable > 0 ? stock : emptyStock}
    </span>
  );
};

SelectQuantity.propTypes = {
  sku: PropTypes.shape({
    quantity: PropTypes.number,
  }),
  setQuantitySelected: PropTypes.func.isRequired,
};

SelectQuantity.defaultProps = {
  sku: {
    quantity: 0,
  },
};

export default SelectQuantity;
