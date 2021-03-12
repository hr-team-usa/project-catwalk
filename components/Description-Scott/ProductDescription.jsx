import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTracking } from 'react-tracking';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import config from '../../config';

import ImageGallery from './ImageGallery/ImageGallery';
import ProductInfo from './ProductInfo/ProductInfo';
import StyleSelector from './StyleSelector/StyleSelector';
import AddToCart from './AddToCart/AddToCart';

const ProductDescription = ({
  productId, productRating, reviewsRef, setProductNameGlobal,
  setCurrentProductData, setCurrentStyleData, setCart, cart,
}) => {
  const { trackEvent } = useTracking({ module: 'Product Overview' });

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [allStyles, setAllStyles] = useState([]);
  const [styleInfo, setStyleInfo] = useState({});

  const [isExpanded, setIsExpanded] = useState(false);

  const getProduct = () => {
    const productRequest = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${productId}`,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      },
    };
    axios(productRequest)
      .then((productResponse) => {
        setCurrentProductData(productResponse.data);
        setProductName(productResponse.data.name);
        setProductNameGlobal(productResponse.data.name);
        setCategory(productResponse.data.category);
        setDescription(productResponse.data.description);
      }).catch((err) => console.error(err)); // eslint-disable-line no-console

    const stylesRequest = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${productId}/styles`,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      },
    };
    axios(stylesRequest)
      .then((stylesResponse) => {
        setAllStyles(stylesResponse.data.results);

        let defaultStyle;

        if (stylesResponse.data.results.find((style) => style['default?'] === true) !== undefined) {
          defaultStyle = stylesResponse.data.results.find((style) => style['default?'] === true);
        } else {
          // eslint-disable-next-line prefer-destructuring
          defaultStyle = stylesResponse.data.results[0];
        }
        setStyleInfo(defaultStyle);
      }).catch((err) => console.error(err)); // eslint-disable-line no-console
  };

  useEffect(() => {
    if (styleInfo) {
      setCurrentStyleData(styleInfo);
    }
  }, [styleInfo]);

  useEffect(() => {
    getProduct();
  }, [productId]);
  return (
    <div>
      <Container className="container-fluid">
        <Row>
          <Col className={isExpanded ? 'col-12' : 'col-7'} onClick={() => trackEvent({ element: 'Image Gallery', time: new Date() })}>
            <ImageGallery styleInfo={styleInfo} setIsExpanded={setIsExpanded} />
          </Col>
          {isExpanded ? null
            : (
              <Col className="col-5">
                <Divider style={{ marginTop: '10px' }} />
                <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <ProductInfo
                    productName={productName}
                    productRating={productRating}
                    category={category}
                    description={description}
                    styleInfo={styleInfo}
                    reviewsRef={reviewsRef}
                  />
                </div>
                <Divider />
                <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <StyleSelector
                    allStyles={allStyles}
                    styleInfo={styleInfo}
                    setStyleInfo={setStyleInfo}
                  />
                </div>
                <Divider />
                <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <AddToCart
                    styleInfo={styleInfo}
                    setCart={setCart}
                    cart={cart}
                    productName={productName}
                  />
                </div>
              </Col>
            )}
        </Row>
      </Container>
    </div>
  );
};

ProductDescription.propTypes = {
  productId: PropTypes.number.isRequired,
  productRating: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  reviewsRef: PropTypes.object,
  setCurrentProductData: PropTypes.func.isRequired,
  setCurrentStyleData: PropTypes.func.isRequired,
  setProductNameGlobal: PropTypes.func.isRequired,
  setCart: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  cart: PropTypes.array.isRequired,
};

ProductDescription.defaultProps = {
  productRating: null,
  reviewsRef: {},
};

export default ProductDescription;
