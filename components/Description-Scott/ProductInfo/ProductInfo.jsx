import React from 'react';
import styles from './ProductInfo.module.css';
import Price from './Price';

const ProductInfo = ({ productName, category, description, styleInfo}) => {
  const url = 'http://localhost:3000/';
  return (
    <div>
      <div> ***** -- Read all reviews link here</div>
      <div className={styles.category}>{category}</div>
      <h2>{productName}</h2>
      <Price styleInfo={styleInfo} />
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
  );
};

export default ProductInfo;
