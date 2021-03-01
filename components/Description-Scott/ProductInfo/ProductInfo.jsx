/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styles from './ProductInfo.module.css';

const ProductInfo = ({ productName, category, description }) => {
  var url = 'http://localhost:3000/'
  return (
    <div>
      <div> ***** -- Read all reviews link here</div>
      <div className={styles.category}>{category}</div>
      <h2>{productName}</h2>
      <div className={styles.price}>dynamic price component here</div>
      <div>{description}</div>
      <span>
        <a href="https://twitter.com/intent/tweet">
          <img src="twitter.png" alt="twitter" width="25" height="25" />
        </a>

        <a href="https://www.pinterest.com/pin/create/button/">
          <img src="pinterest.png" alt="pinterest" width="25" height="25" />
        </a>

        <a href={`https://facebook.com/sharer/sharer.php?u=${url}`}>
          <img src="facebook.png" alt="facebook" width="25" height="25" />
        </a>

      </span>


    </div>
  )
};

export default ProductInfo;
