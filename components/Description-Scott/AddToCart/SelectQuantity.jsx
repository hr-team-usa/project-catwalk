import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


/* eslint-disable */
const SelectQuantity = ({ sku, setQuantitySelected }) => {
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [quantityAvailable, setQuantityAvailable] = useState(0);

  const checkQuantity = () => {
    if (sku) {
      setQuantityAvailable(sku.quantity);
      setCurrentQuantity(1);
    }
  };

  const clickHandler = (quantity) => {
    setQuantitySelected(quantity);
    setCurrentQuantity(quantity);
  };

  useEffect(() => {
    checkQuantity();
  }, [sku]);

  if (quantityAvailable === 0) {
    // eslint-disable-next-line vars-on-top
    var emptyStock = ( // eslint-disable-line no-var

      <DropdownButton disabled id="dropdown-basic-button" title="-" />);
  } else {
    let quantities = []
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
    <div>
      {/* eslint-disable-next-line block-scoped-var */}
      {quantityAvailable > 0 ? stock : emptyStock}
    </div>
  );
};

SelectQuantity.propTypes = {
  styleInfo: PropTypes.shape({
    skus: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }),
};

SelectQuantity.defaultProps = {
  styleInfo: {
    skus: null,
  },
};

export default SelectQuantity;
