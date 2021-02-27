/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import Image from 'next/image'

// should pull in productId from global state
const ImageGallery = () => {
  // Necessities:
  // productID of selected product -> allows us to fetch the various styles -> allows us to get main image for selected style
  // image thumbnails

  let productId = 18078;
  let [mainImageSrc, setMainImageSrc] = useState('');
  let [thumbnails, setThumbnails] = useState([]);

  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${productId}/styles`,
    method: 'get',
    headers: {
      Authorization: config.TOKEN,
    }
  }

  const getImages = () => {
    axios(options)
      .then((results) => {
        var styles = results.data.results;
        console.log('results.data: ', results.data);
        console.log('styles: ', styles);
        var defaultStyle = styles.find(style => style['default?'] === true)
        setMainImageSrc(defaultStyle.photos[0].url);
        var thumbnails = []

        for (var i=0; i < defaultStyle.photos.length; i++) {
          thumbnails.push(defaultStyle.photos[i].thumbnail_url)
        }

        setThumbnails(thumbnails);
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getImages();
  }, [])

  return (

  <div>
    {/* Main Image: */}
    <Image
      src={mainImageSrc || '/favicon.ico'}
      alt="main product image"
      width={250}
      height={300}
    />
   {/* Thumbnails: */}
   {thumbnails.length > 0 ? thumbnails.map((thumbnail) => (
     <Image
       src={thumbnail || '/favicon.ico'}
       key={thumbnail}
       alt="thumbnail product image"
       width={78}
       height={78}
     />
   )) : <div/>}

  </div>
);
}
export default ImageGallery;