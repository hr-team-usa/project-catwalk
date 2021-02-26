/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

// should pull in productId from global state
const ImageGallery = () => {
  // Necessities:
  // productID of selected product -> allows us to fetch the various styles -> allows us to get main image for selected style
  // image thumbnails

  let productId = 18201;
  let [mainImageSrc, setMainImageSrc] = useState('');

  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${productId}/styles`,
    method: 'get',
    headers: {
      Authorization: config.TOKEN,
    }
  }

  const getMainImage = () => {
    axios(options)
    .then((results) => {
      var styles = results.data.results;
      console.log('styles: ', styles);
      // could use the 'find' method here instead of iterating through each style
      styles.forEach((style) => {
        if (style['default?']) {
          console.log('photo url: ', style.photos[0].url)
          setMainImageSrc(style.photos[0].url);
          return;
        }
      })
    })
    .catch ((err) => console.error(err))


}

useEffect(() => {
  getMainImage();
}, [])

return (
  <div>
    <img
      src={mainImageSrc}
      alt="main product image"
      // width={500}
      // height={500}
    />
  </div>
);
}
export default ImageGallery;