import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';

import ImageGallery from './ImageGallery/ImageGallery';
import ProductInfo from './ProductInfo/ProductInfo';
import StyleSelector from './StyleSelector/StyleSelector';
import AddToCart from './AddToCart/AddToCart';

const ProductDescription = ({ productId, productRating }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [allStyles, setAllStyles] = useState([]);
  const [styleInfo, setStyleInfo] = useState({});

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
        setProductName(productResponse.data.name);
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
        const defaultStyle = stylesResponse.data.results.find((style) => style['default?'] === true);
        setStyleInfo(defaultStyle);
      }).catch((err) => console.error(err)); // eslint-disable-line no-console
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <ImageGallery styleInfo={styleInfo} />
          </Col>
          <Col>
            <ProductInfo
              productName={productName}
              productRating={productRating}
              category={category}
              description={description}
              styleInfo={styleInfo}
            />
            <StyleSelector
              allStyles={allStyles}
              styleInfo={styleInfo}
              setStyleInfo={setStyleInfo}
            />
            <AddToCart styleInfo={styleInfo} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ProductDescription.propTypes = {
  productId: PropTypes.number.isRequired,
  productRating: PropTypes.number,
};

ProductDescription.defaultProps = {
  productRating: null,
};

export default ProductDescription;
