import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import styles from './ImageGallery.module.css';

const ImageGallery = ({ styleInfo }) => {
  const [mainImageSrc, setMainImageSrc] = useState('');
  const [fullSizeImages, setFullSizeImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [expandView, setExpandView] = useState(false);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getImages = () => {
    if (Object.entries(styleInfo).length > 0) {
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
    setIndex(0);

    const newSlides = [];

    for (let i = 0; i < thumbnails.length; i += 1) {
      const currentSlide = [];
      let j = i;
      let counter = 0;
      while (currentSlide.length < 8 && counter < thumbnails.length) {
        currentSlide.push({ src: thumbnails[j], index: j });
        j += 1;
        counter += 1;
        if (j === thumbnails.length) {
          j = 0;
        }
      }
      newSlides.push(currentSlide);
    }
    setSlides(newSlides);
  };

  const expand = () => {
    console.log('expand has been clicked!');
    setExpandView(!expandView);
  };

  useEffect(() => {
    getImages();
  }, [styleInfo]);

  useEffect(() => {
    renderThumbnails();
  }, [thumbnails]);

  return (
    <>
      <div className={styles.mainImageContainer}>

        {/* Main Image: */}
        <Carousel
          className={styles.carousel}
          indicators={false}
          interval={null}
          activeIndex={index}
          onSelect={handleSelect}
        >

          {fullSizeImages.length > 0 ? fullSizeImages.map((image) => (
            <Carousel.Item key={image}>
              <Image
                className={styles.mainImage}
                src={image || '/no-image-icon.png'}
                alt="main product image"
                fluid
              />
            </Carousel.Item>

          )) : null}
        </Carousel>
        <button onClick={expand} className={styles.expandButton}></button>
      </div>

      {/* Thumbnails: */}
      <Carousel
        indicators={false}
        // controls={false}
        interval={null}
        // onSelect={handleSelect}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {slides.length > 0 ? slides.map((slide, i) => (
          <Carousel.Item key={i} className={styles.innerCarousel}>
            {slide.length > 0 ? slide.map((srcObj) => (
              <Image
                src={srcObj.src || '/no-image-icon.png'}
                alt="thumbnail product image"
                width={78}
                height={78}
                // eslint-disable-next-line react/no-array-index-key
                key={srcObj.index}
                // onClick={handleSelect}
                onClick={() => handleSelect(srcObj.index)}
                fluid
              />
            )) : null}
          </Carousel.Item>
        )) : null}
      </Carousel>
      <Modal show={expandView} onHide={() => setExpandView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setExpandView(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setExpandView(false)}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};

ImageGallery.propTypes = {
  styleInfo: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      thumbnail_url: PropTypes.string,
    })),
  }),
};

ImageGallery.defaultProps = {
  styleInfo: null,
};

export default ImageGallery;
