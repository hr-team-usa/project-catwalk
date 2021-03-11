/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useTracking } from 'react-tracking';
import PropTypes from 'prop-types';
import {
  PinterestShareButton, PinterestIcon,
  TwitterShareButton, TwitterIcon,
  FacebookShareButton, FacebookIcon,
} from 'react-share';
import styles from './ProductInfo.module.css';
import Price from './Price';
import Stars from '../../Reviews-Jim/components/Stars';

const ProductInfo = ({
  productName, category, description, styleInfo, productRating, reviewsRef,
}) => {
  const {trackEvent } = useTracking({ module: 'Product Overview' });

  const url = 'http://18.224.109.82/';
  const starsStyle = {
    display: 'inline',
  };

  const scrollToReviews = (ref) => {
    window.scrollTo(0, ref.current.offsetTop);
  };

  return (
    <div>
      {productRating !== null ? (
        <>
          <Stars style={starsStyle} rating={productRating} />
          <span
            onClick={() => scrollToReviews(reviewsRef)}
            onKeyUp={() => scrollToReviews(reviewsRef)}
            role="button"
            tabIndex={0}
          >
            <u>Read all reviews</u>
          </span>
        </>
      ) : null}
      <div className={styles.category}>{category}</div>
      <h2>{productName}</h2>
      <Price styleInfo={styleInfo} />
      <div style={{ marginTop: '5px', marginBottom: '5px' }}>{description}</div>
      { styleInfo.photos && (
        <span
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
          onClick={() => {
            trackEvent({ element: 'Social Media', time: new Date() });
          }}
          onKeyUp={() => {
            trackEvent({ element: 'Social Media', time: new Date() });
          }}
        >
          <TwitterShareButton url={url} hashtags={['TEAMUSA', 'FEC', 'hackreactor']}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <PinterestShareButton url={url} media={styleInfo.photos[0].url || `${url}/no-image-icon.png`} description="check out this product!">
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <FacebookShareButton url={url} hashtag="TEAMUSA">
            <FacebookIcon size={32} round />
          </FacebookShareButton>

        </span>
      )}
    </div>
  );
};

ProductInfo.propTypes = {
  productName: PropTypes.string.isRequired,
  productRating: PropTypes.string,
  category: PropTypes.string.isRequired,
  description: PropTypes.string,
  styleInfo: PropTypes.shape({
    name: PropTypes.string,
    style_id: PropTypes.number,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    photos: PropTypes.array,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  reviewsRef: PropTypes.object,
};

ProductInfo.defaultProps = {
  description: null,
  productRating: null,
  styleInfo: {
    name: 'style name',
    style_id: null,
    original_price: null,
    sale_price: null,
  },
  reviewsRef: {},
};

export default ProductInfo;
