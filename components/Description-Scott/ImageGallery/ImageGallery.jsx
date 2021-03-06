import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Carousel, Image, Card, CardColumns } from 'react-bootstrap';
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
    // height: '100%',
    height: '100%',
    objectFit: 'cover',
    // width: '100%',
    border: 'double',
    boxShadow: '8px 5px 5px black',
  };

  const defaultThumbStyle = {
    height: '100%',
    objectFit: 'cover',
    boxShadow: '5px 2.5px 2.5px black',
  };

  // ------------------ POPULATE STATE FUNCTIONS ------------------

  // populates the fullSizeImages and thumbnails states
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

  // divide the thumbnails into groups of seven, populate thumbCarousel state with this array
  const groupBySevens = () => {
    const thumbnailGroups = [];
    let thumbnailIndex = 0;
    let counter = 0;
    while (thumbnailIndex < thumbnails.length) {
      const currentGroup = [];
      for (let i = 0; i < 7; i += 1) {
        let imageSrc = thumbnails[thumbnailIndex] || 'no image';
        if (imageSrc.slice(0, 4) !== 'http') {
          imageSrc = '/no-image-icon.png';
        }
        currentGroup.push({ thumbnail: imageSrc, index: counter });
        counter += 1;
        thumbnailIndex += 1;
        if (thumbnailIndex === thumbnails.length) {
          break;
        }
      }
      thumbnailGroups.push(currentGroup);
    }
    if (index >= thumbnails.length) {
      setIndex(0);
    }
    setThumbCarousel(thumbnailGroups);
  };

  // ------------------ EVENT HANDLERS ------------------

  // image selected
  const handleSelect = (selectedIndex) => {
    setMainImageSrc(fullSizeImages[selectedIndex]);
    setIndex(selectedIndex);
  };

  // expand button click handler
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

  // click handler for scrolling through thumbnails
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

  // render a different main image element based on current view state
  const renderCarouselItem = (image) => {
    switch (view) {
      case 'default':
        return (
          <Image
            className={styles.mainImage}
            src={image || '/no-image-icon.png'}
            alt="main product image"
            onClick={expand}
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
      <div className={styles.mainImageContainer} style={{ border: '1px solid #92A2B0' }}>
        {/* Main Image Carousel: */}
        <Carousel
          id="mainCarousel"
          className={carouselStyle}
          indicators={view === 'expanded'}
          interval={null}
          activeIndex={index}
          onSelect={handleSelect}
        >

          {fullSizeImages.length > 0 ? fullSizeImages.map((image) => (
            <Carousel.Item key={image} style={{ height: '100%' }}>
              {renderCarouselItem(image)}
            </Carousel.Item>

          )) : null}
          {/* hide carousel controls when at beg/end of carousel */}
          {index === 0
            ? (
              <style type="text/css">
                {`
              #maincarousel .carousel-control-prev {
                visibility: hidden;
              }
            `}
              </style>
            )
            : null}
          {index === fullSizeImages.length - 1
            ? (
              <style type="text/css">
                {`
              #maincarousel .carousel-control-next {
                visibility: hidden;
              }
            `}
              </style>
            )
            : null}
        </Carousel>
        {/* expand view button */}
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
          top: '50px',
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
                  src={thumbnailObj.thumbnail || '/no-image-icon.png'}
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
      {/* hide up/down controls when at beg/end of thumbnail group */}
      {index === 0 ? (
        <style type="text/css">
          {`
          #mainCarousel .carousel-control-prev {
            visibility: hidden
          }
      `}
        </style>
      ) : null}
      {index === thumbnails.length - 1 ? (
        <style type="text/css">
          {`
                #mainCarousel .carousel-control-next {
                  visibility: hidden
                }
            `}
        </style>
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
