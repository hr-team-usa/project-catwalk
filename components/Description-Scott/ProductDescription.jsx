/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import StyleSelector from './StyleSelector/StyleSelector.jsx';

import { Container, Row, Col } from 'react-bootstrap';

const ProductDescription = () => {
  // should receive productId state as a prop from index
  var productId = 18078;
  var [productName, setProductName] = useState('');
  var [category, setCategory] = useState('');
  var [description, setDescription] = useState('');

  var [allStyles, setAllStyles] = useState([]);
  var [styleInfo, setStyleInfo] = useState('');

  const getProduct = () => {
    const productRequest = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${productId}`,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      }
    }
    axios(productRequest)
      .then((productResponse) => {
        setProductName(productResponse.data.name);
        setCategory(productResponse.data.category);
        setDescription(productResponse.data.description);
      }).catch((err) => console.error(err));

    const stylesRequest = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${productId}/styles`,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      }
    }
    axios(stylesRequest)
      .then((stylesResponse) => {
        setAllStyles(stylesResponse.data.results);
        var defaultStyle = stylesResponse.data.results.find(style => style['default?'] === true)
        setStyleInfo(defaultStyle);
      }).catch((err) => console.error(err));
  }

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
            <ProductInfo productName={productName}
              category={category}
              description={description}
              styleInfo={styleInfo}
            />
            <StyleSelector allStyles={allStyles} styleInfo={styleInfo} setStyleInfo={setStyleInfo} />
            <div> Add to Cart will go here </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default ProductDescription;
