/* eslint-disable */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import styles from './Price.module.css';

const Price = ({ styleInfo }) => {
  var [originalPrice, setOriginalPrice] = useState('');
  var [salePrice, setSalePrice] = useState('');
  var [onSale, setOnSale] = useState(false)

  var checkPrice = () => {
    setOriginalPrice(`$${styleInfo.original_price}`);

    if (styleInfo.sale_price) {
      console.log('onSale triggered', styleInfo.sale_price);
      setOnSale(true);
      setSalePrice(`$${styleInfo.sale_price}`);
    }
  }

  useEffect(() => {
    checkPrice();
  }, [styleInfo])

  return (
    <div>
      {onSale ? <div>
        <span className={styles.salePrice}>{`${salePrice}`}</span>
        <span className={styles.originalPrice}>{`${originalPrice}`}</span></div> : (<div >{`${originalPrice}`}</div>)}
    </div>
  )
}

export default Price;
