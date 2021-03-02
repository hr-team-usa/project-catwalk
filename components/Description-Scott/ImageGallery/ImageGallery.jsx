import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import styles from './ImageGallery.module.css';

// should pull in productId from global state
const ImageGallery = ({ styleInfo }) => {
  // Necessities:
  // productID of selected product -> allows us to fetch the various styles:
  //   allows us to get main image for selected style

  const [mainImageSrc, setMainImageSrc] = useState('');
  const [fullSizeImages, setFullSizeImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [slides, setSlides] = useState([]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const getImages = () => {
    if (styleInfo) {
      setMainImageSrc(styleInfo.photos[0].url);

      const newFullSizeImages = [];
      const newThumbnails = [];

      for (let i = 0; i < styleInfo.photos.length; i += 1) {
        newFullSizeImages.push(styleInfo.photos[i].url);
        newThumbnails.push(styleInfo.photos[i].thumbnail_url);
      }
      setFullSizeImages(newFullSizeImages);
      setThumbnails(newThumbnails);
    }
  };

  const renderThumbnails = () => {
    const newSlides = [];
    let j = index;
    let counter = 0;
    while (newSlides.length < 7 && counter < thumbnails.length) {
      newSlides.push(thumbnails[j]);
      j += 1;
      counter += 1;
      if (j === thumbnails.length) {
        j = 0;
      }
    }
    setSlides(newSlides);
  };

  useEffect(() => {
    getImages();
  }, [styleInfo]);

  useEffect(() => {
    renderThumbnails();
  }, [thumbnails, index]);

  return (
    <div className={styles.test}>

      <Carousel
        className={styles.carousel}
        indicators={false}
        interval={null}
        activeIndex={index}
        onSelect={handleSelect}
      >
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
};
export default ImageGallery;
