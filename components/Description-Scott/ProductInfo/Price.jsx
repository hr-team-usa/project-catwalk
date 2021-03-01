/* eslint-disable */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Price = ({styleInfo}) => {
  var [price, setPrice] = useState('');

  var checkPrice = () => {

    if (styleInfo.sale_price!== null) {
      setPrice(styleInfo.sale_price);
    } else {
      setPrice(styleInfo.original_price);
    }
  }

  useEffect(()=> {
    checkPrice();
  }, [styleInfo])

  return (
    <div >${`${price}`}</div>
  )
}

export default Price;
