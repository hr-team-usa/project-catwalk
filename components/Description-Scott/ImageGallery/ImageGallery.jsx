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

  const [thumbCarousel, setThumbCarousel] = useState([]);
  const [thumbSliderIndex, setThumbSliderIndex] = useState(0);

  const [index, setIndex] = useState(0);
  const [view, setView] = useState('default');
  const [carouselStyle, setCarouselStyle] = useState(styles.carousel);

  const selectedThumbStyle = {
    height: '100%',
    width: '100%',
    border: 'double',
    boxShadow: '8px 5px 5px black',
  };

  const defaultThumbStyle = {
    height: '100%',
    width: '100%',
    boxShadow: '5px 2.5px 2.5px black',
  };

  // ------------------ POPULATE STATE FUNCTIONS ------------------

  // populates the fullSizeImages and thumbnails arrays
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
      case 'zoomed':
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

  const thumbnailScroll = (direction) => {
    let newIndex = thumbSliderIndex;
    if (direction === 'down') {
      newIndex -= 1;
      if (newIndex < 0) {
        newIndex = thumbCarousel.length - 1;
      }
    } else {
      newIndex += 1;
      if (newIndex === thumbCarousel.length) {
        newIndex = 0;
      }
    }
    setThumbSliderIndex(newIndex);
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
                  width: 2500,
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
    groupBySevens();
    setThumbSliderIndex(0);
  }, [thumbnails]);

  return (
    <>
      <div className={styles.mainImageContainer}>
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
        <div style={{
          width: '80px',
          height: '500px',
          position: 'absolute',
          top: '5%',
          left: '5%',
        }}
        >
          <CardColumns style={{ columnCount: 1 }}>
            {thumbCarousel.length > 1 ? (
              <button
                onClick={() => thumbnailScroll('up')}
                className={styles.upArrow}
                type="button"
                aria-label="up thumbnails"
                style={{ top: '-5px' }}
              />
            ) : null}
            {thumbCarousel.length > 0 ? thumbCarousel[thumbSliderIndex].map((thumbnailObj) => (
              <Card
                key={thumbnailObj.index}
                style={{ height: '60px', width: '60px' }}
              >
                <Card.Img
                  style={thumbnailObj.index === index ? selectedThumbStyle : defaultThumbStyle}
                  src={thumbnailObj.thumbnail}
                  onClick={() => handleSelect(thumbnailObj.index)}
                  alt="thumbnail image"
                />
              </Card>
            ))
              : null}

            {thumbCarousel.length > 1 ? (
              <button
                onClick={() => thumbnailScroll('down')}
                className={styles.upArrow}
                style={{ transform: 'rotate(180deg)', top: '-10px' }}
                type="button"
                aria-label="down thumbnails"
              />
            ) : null}
          </CardColumns>
        </div>
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
