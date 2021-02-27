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

  let productId = 18201;
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
        // could use the 'find' method here instead of iterating through each style
        styles.forEach((style) => {
          if (style['default?']) {
            style.photos.forEach((photo) => {
              console.log('photo url: ', photo.url)
              setMainImageSrc(photo.url);
              // add thumbnail photos to thumbnails array
              setThumbnails([...thumbnails, photo.thumbnail_url])
            })
            return;
          }
        })
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