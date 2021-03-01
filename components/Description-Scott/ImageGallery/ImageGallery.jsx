/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styles from './ImageGallery.module.css';

import axios from 'axios';
import config from '../../../config';

// import Image from 'next/image'
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';

// should pull in productId from global state
const ImageGallery = ({ styleInfo }) => {
  // Necessities:
  // productID of selected product -> allows us to fetch the various styles -> allows us to get main image for selected style
  // image thumbnails

  let productId = 18078;
  let [mainImageSrc, setMainImageSrc] = useState('');
  let [fullSizeImages, setFullSizeImages] = useState([]);
  let [thumbnails, setThumbnails] = useState([]);
  let [slides, setSlides] = useState([]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${productId}/styles`,
    method: 'get',
    headers: {
      Authorization: config.TOKEN,
    }
  }

  const getImages = () => {
    if (styleInfo) {
      setMainImageSrc(styleInfo.photos[0].url);

      var fullSizeImages = [];
      var thumbnails = []

      for (var i = 0; i < styleInfo.photos.length; i++) {
        fullSizeImages.push(styleInfo.photos[i].url);
        thumbnails.push(styleInfo.photos[i].thumbnail_url);
      }
      setFullSizeImages(fullSizeImages);
      setThumbnails(thumbnails);
    }
  }

  const renderThumbnails = () => {
    let slides = [];
    let j = index;
    let counter = 0;
    while (slides.length < 7 && counter < thumbnails.length) {
      slides.push(thumbnails[j]);
      j++;
      counter++;
      if (j === thumbnails.length) {
        j = 0;
      }
    }
    setSlides(slides);
    return;
  }

  useEffect(() => {
    getImages();
  }, [styleInfo])

  useEffect(() => {
    renderThumbnails();
  }, [thumbnails, index])

  return (
    <div className={styles.test}>

      <Carousel className={styles.carousel} indicators={false} interval={null} activeIndex={index} onSelect={handleSelect}>

        {/* Main Image: */}
        {fullSizeImages.length > 0 ? fullSizeImages.map((image) => (
          <Carousel.Item key={image}>

            <Image
              src={image || '/favicon.ico'}
              alt="main product image"
              fluid
            />
          </Carousel.Item>
        )) : <div />}

      </Carousel>

      <Carousel indicators={false} controls={false} interval={null} onSelect={handleSelect}>
        {/* Thumbnails: */}
        <Carousel.Item className={styles.innerCarousel}>
          {slides.length > 0 ? slides.map((slide, i) => (
            <Image
              src={slide || '/favicon.ico'}
              alt="thumbnail product image"
              width={78}
              height={78}
              key={i}
              onClick={() => setIndex(i)}
            />
          )) : <div />}
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default ImageGallery;

/*
<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
<ol className="carousel-indicators">
  <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
</ol>
<div className="carousel-inner">
  <div className="carousel-item active">
    <img className="d-block w-100" src={fullSizeImages[0]} alt="First slide" />
  </div>
  <div className="carousel-item">
    <img className="d-block w-100" src={fullSizeImages[1]} alt="Second slide" />
  </div>
  <div className="carousel-item">
    <img className="d-block w-100" src={fullSizeImages[2]} alt="Third slide" />
  </div>
</div>
<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="sr-only">Previous</span>
</a>
<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="sr-only">Next</span>
</a>
</div>

    */