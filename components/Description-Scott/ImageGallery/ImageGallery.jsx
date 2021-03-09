import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import ReactImageMagnify from 'react-image-magnify';

import styles from './ImageGallery.module.css';

const ImageGallery = ({ styleInfo, setIsExpanded }) => {
  const [mainImageSrc, setMainImageSrc] = useState('');
  const [fullSizeImages, setFullSizeImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [slides, setSlides] = useState([]);

  const [thumbCarousel, setThumbCarousel] = useState([]);

  const [index, setIndex] = useState(0);

  const [view, setView] = useState('default');

  const [carouselStyle, setCarouselStyle] = useState(styles.carousel);

  const selectedThumbStyle = {
    height: '100%',
    width: '100%',
    border: 'double',
  };

  const defaultThumbStyle = {
    height: '100%',
    width: '100%',
  };

  // ------------------ POPULATE STATE FUNCTIONS ------------------

  // populates the fullSizeImages and thumbnails arrays (states)
  // called whenever styleInfo prop changes
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

  // returns an array of arrays, the inner arrays contain src for each thumbnail image
  const renderThumbnails = () => {
    setIndex(0);

    const newSlides = [];

    for (let i = 0; i < thumbnails.length; i += 1) {
      const currentSlide = [];
      let j = i;
      let counter = 0;
      while (currentSlide.length < 7 && counter < thumbnails.length) {
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

  const groupBySevens = () => {
    const thumbnailGroups = [];
    let thumbnailIndex = 0;
    let counter = 0;
    while (thumbnailIndex < thumbnails.length) {
      const currentGroup = [];
      for (let i = 0; i < 7; i += 1) {
        currentGroup.push({ thumbnail: thumbnails[thumbnailIndex], index: counter });
        counter += 1;
        thumbnailIndex += 1;
        if (thumbnailIndex === thumbnails.length) {
          break;
        }
      }
      thumbnailGroups.push(currentGroup);
    }
    setThumbCarousel(thumbnailGroups);
  };

  // ------------------ EVENT HANDLERS ------------------

  const handleSelect = (selectedIndex) => {
    setMainImageSrc(fullSizeImages[selectedIndex]);
    setIndex(selectedIndex);
  };

  const expand = () => {
    switch (view) {
      case 'default':
        setCarouselStyle(styles.carouselExpanded);
        setView('expanded');
        setIsExpanded(true);
        break;
      case 'expanded':
        setCarouselStyle(styles.carouselZoomed);
        setView('zoomed');
        break;
      default:
        setCarouselStyle(styles.carousel);
        setView('default');
        setIsExpanded(false);
    }
  };

  // ------------------ CONDITIONAL RENDERING FUNCTIONS ------------------

  const renderCarouselItem = (image) => {
    switch (view) {
      case 'default':
        return (
          <Image
            className={styles.mainImage}
            src={image || '/no-image-icon.png'}
            alt="main product image"
            onClick={expand}
            fluid
          />
        );
      case 'expanded':
        return (
          <Image
            className={styles.mainImage}
            style={{ cursor: 'zoom-in' }}
            src={image || '/no-image-icon.png'}
            alt="main product image"
            onClick={expand}
            fluid
          />
        );
      case 'zoomed':
        return (
          <div onClick={expand} onKeyUp={expand} role="button" tabIndex={0}>
            <ReactImageMagnify
              // https://github.com/ethanselzer/react-image-magnify
              enlargedImagePosition="over"
              style={{ zIndex: 4, cursor: 'zoom-out' }}
              enlargedImageContainerStyle={{ width: '100vh', height: '100vh' }}
              enlargedImageStyle={{ position: 'fixed' }}
              {...{
                smallImage: {
                  alt: 'zoomed main product image',
                  isFluidWidth: true,
                  src: mainImageSrc || '/no-image-icon.png',
                },
                largeImage: {
                  src: mainImageSrc || '/no-image-icon.png',
                  width: 2400,
                  height: 3600,
                },
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    getImages();
  }, [styleInfo]);

  useEffect(() => {
    renderThumbnails();
    groupBySevens();
  }, [thumbnails]);

  return (
    <>
      <div className={styles.mainImageContainer}>
        {console.log('activeIndex: ', index)}

        {/* Main Image: */}
        <Carousel
          className={carouselStyle}
          indicators={false}
          interval={null}
          activeIndex={index}
          onSelect={handleSelect}
        >

          {fullSizeImages.length > 0 ? fullSizeImages.map((image) => (
            <Carousel.Item key={image} style={{ height: '100%' }}>
              {renderCarouselItem(image)}
            </Carousel.Item>

          )) : null}
        </Carousel>
        <button
          onClick={() => {
            if (view === 'expanded') {
              setCarouselStyle(styles.carousel);
              setView('default');
              setIsExpanded(false);
            } else {
              expand();
            }
          }}
          className={styles.expandButton}
          type="button"
          aria-label="expand image"
        />
      </div>

      {/* Thumbnails: */}
      {view === 'default' ? (
        <CardColumns style={{ columnCount: 1 }}>
          {thumbCarousel.length > 0 ? thumbCarousel[0].map((thumbnailObj) => (
            <Card
              key={thumbnailObj.index}
              style={{ height: '78px', width: '78px' }}
            >
              <Card.Img
                style={thumbnailObj.index === index ? selectedThumbStyle : defaultThumbStyle}
                src={thumbnailObj.thumbnail}
                onClick={() => setIndex(thumbnailObj.index)}
              />
            </Card>
          ))
            : null}
        </CardColumns>
      ) : null}
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
  setIsExpanded: PropTypes.func.isRequired,
};

ImageGallery.defaultProps = {
  styleInfo: null,
};

export default ImageGallery;
