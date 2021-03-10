import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Overlay from 'react-bootstrap/Overlay';
import styles from './SelectSize.module.css';

const SelectSize = ({
  styleInfo, setSku, setIsOutOfStock, invalidAdd, setInvalidAdd,
}) => {
  const [currentSize, setCurrentSize] = useState('Select Size');
  const [sizesAvailable, setSizesAvailable] = useState([]);
  const [active, setActive] = useState(false);

  const [overlayShow, setOverlayShow] = useState(false);
  const target = useRef(null);

  const populateSKUs = () => {
    const skusAvailable = [];
    if (styleInfo.skus) {
      const skus = Object.values(styleInfo.skus);
      for (let i = 0; i < skus.length; i += 1) {
        if (skus[i].quantity > 0) {
          skusAvailable.push(skus[i]);
        }
      }
      // skusAvailable.length === 0 ? setIsOutOfStock(true) : setIsOutOfStock(false)
      if (skusAvailable.length === 0) {
        setIsOutOfStock(true);
      } else {
        setIsOutOfStock(false);
      }
    }
    setSizesAvailable(skusAvailable);
    // use this for testing 'out of stock':
    // setSizesAvailable([]);
    // setIsOutOfStock(true);
  };

  const clickHandler = (sku) => {
    setInvalidAdd(false);
    setOverlayShow(false);
    setActive(false);
    setCurrentSize(sku.size);
    setSku(sku);
  };

  useEffect(() => {
    setCurrentSize('Select Size');
    setSku({ size: 'Select Size', quantity: null });
    if (invalidAdd) {
      setActive(true);
      setOverlayShow(true);
      setInvalidAdd(false);
    }
    populateSKUs();
  }, [styleInfo, invalidAdd]);

  if (sizesAvailable.length === 0) {
    // eslint-disable-next-line vars-on-top
    var emptyStock = ( // eslint-disable-line no-var

      <DropdownButton className={styles.dropdown} disabled id="dropdown-basic-button" title="Out of Stock" />);
  } else {
    // eslint-disable-next-line vars-on-top
    var stock = ( // eslint-disable-line no-var
      <DropdownButton
        style={{ width: '120px' }}
        show={active}
        id="dropdown-basic-button"
        title={currentSize}
        onClick={() => setActive(!active)}
        ref={target}
      >
        <Overlay target={target.current} show={overlayShow} placement="top">
          {({
            placement, arrowprops, show: _show, popper, ...props
          }) => ( // made this arrowprops lowercase to rid error -Jim -MichaelScott
            <div
              {...props}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
              Please select a size
            </div>
          )}
        </Overlay>

        <Dropdown.Item onClick={() => clickHandler({ size: 'Select Size', quantity: null })}>Select Size</Dropdown.Item>
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
  setIsOutOfStock: PropTypes.func.isRequired,
  invalidAdd: PropTypes.bool.isRequired,
  setInvalidAdd: PropTypes.func.isRequired,
};

SelectSize.defaultProps = {
  styleInfo: {
    skus: null,
  },
};

export default SelectSize;
