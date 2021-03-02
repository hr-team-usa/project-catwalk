import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Price.module.css';

const Price = ({ styleInfo }) => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [onSale, setOnSale] = useState(false);

  const checkPrice = () => {
    setOriginalPrice(`$${styleInfo.original_price}`);

    if (styleInfo.sale_price) {
      setOnSale(true);
      setSalePrice(`$${styleInfo.sale_price}`);
    } else {
      setOnSale(false);
      setSalePrice('');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('style(styleInfo) has changed: ', styleInfo);
    checkPrice();
  }, [styleInfo]);

  return (
    <div>
      {onSale ? (
        <div>
          <span className={styles.salePrice}>{`${salePrice}`}</span>
          <span className={styles.originalPrice}>{`${originalPrice}`}</span>
        </div>
      ) : (<div>{`${originalPrice}`}</div>)}
    </div>
  );
};

Price.propTypes = {
  styleInfo: PropTypes.shape({
    name: PropTypes.string,
    style_id: PropTypes.number,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
  }),
};

Price.defaultProps = {
  styleInfo: {
    name: 'style name',
    style_id: null,
    original_price: null,
    sale_price: null,
  },
};

export default Price;
